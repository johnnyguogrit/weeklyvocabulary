import re

# Read the markdown file
with open('2025-2026_Subject_Weekly_Vocabulary.md', 'r', encoding='utf-8') as f:
    lines = f.readlines()

subjects = ['Maths', 'Science', 'STEAM', 'Music', 'Performing Arts', 'Drama', 'Visual Arts', 'PE']

data = []

for line in lines:
    line = line.strip()
    # Skip non-table lines
    if not line.startswith('|'):
        continue
    # Skip separator and header rows
    if '---' in line or line.startswith('| Week') or line.startswith('|Deadline'):
        continue

    parts = [p.strip() for p in line.split('|')[1:-1]]
    if len(parts) >= 10:
        week = parts[0]
        deadline = parts[1] if parts[1] and parts[1] != 'NaN' else None
        grade = parts[2]
        keywords = parts[3:11]

        # Only add if we have valid week and grade data
        if week and week != 'Week' and grade and grade != 'Grade':
            data.append({
                'week': week,
                'deadline': deadline,
                'grade': grade,
                'keywords': keywords
            })

# Group by week
weeks = {}
for entry in data:
    week = entry['week']
    if week not in weeks:
        weeks[week] = {'deadline': entry['deadline'], 'entries': []}
    weeks[week]['entries'].append(entry)

# Sort weeks (extract numeric part for sorting)
def week_key(w):
    match = re.search(r'\d+', w)
    return int(match.group()) if match else 0

sorted_weeks = sorted(weeks.items(), key=lambda x: week_key(x[0]))

# Generate output
output_lines = []

for week, week_data in sorted_weeks:
    deadline = week_data['deadline']
    entries = week_data['entries']

    if deadline:
        output_lines.append(f'# Week {week} (Deadline: {deadline})')
    else:
        output_lines.append(f'# Week {week}')
    output_lines.append('')

    # Group by grade (sort G1-G5)
    grades = {}
    for entry in entries:
        grade = entry['grade'].replace('Grade ', 'G')
        if grade not in grades:
            grades[grade] = {}
        for i, subject in enumerate(subjects):
            keywords = entry['keywords'][i]
            if keywords and keywords != 'NaN':
                grades[grade][subject] = keywords

    sorted_grades = sorted(grades.items(), key=lambda x: int(re.search(r'\d+', x[0]).group()) if re.search(r'\d+', x[0]) else 0)

    for grade, subjects_dict in sorted_grades:
        output_lines.append(f'## {grade}')
        output_lines.append('')

        for subject, keywords in subjects_dict.items():
            # Clean up keywords
            keywords_clean = keywords.replace('NaN', '').strip()
            keywords_clean = re.sub(r'\s*,\s*', ', ', keywords_clean)
            keywords_clean = keywords_clean.replace('\\n', '').replace('\n', ' ')
            keywords_clean = keywords_clean.replace('、', ', ')
            keywords_clean = keywords_clean.replace('，', ', ')
            keywords_clean = re.sub(r'\s+', ' ', keywords_clean)
            keywords_clean = keywords_clean.strip(', ')

            if keywords_clean:
                output_lines.append(f'### {subject}')
                output_lines.append('')
                kw_list = [k.strip() for k in keywords_clean.split(',') if k.strip()]
                for kw in kw_list:
                    output_lines.append(f'- {kw}')
                output_lines.append('')

    output_lines.append('---')
    output_lines.append('')

# Write output
with open('2025-2026_Subject_Weekly_Vocabulary_Formatted.md', 'w', encoding='utf-8') as f:
    f.write('\n'.join(output_lines))

print('Conversion complete!')
