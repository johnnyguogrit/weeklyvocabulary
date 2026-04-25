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

# Reorganize: Grade > Subject > Week
grades_data = {}

for entry in data:
    grade = entry['grade'].replace('Grade ', 'G')
    week = entry['week']

    if grade not in grades_data:
        grades_data[grade] = {}

    for i, subject in enumerate(subjects):
        if subject not in grades_data[grade]:
            grades_data[grade][subject] = {}

        keywords = entry['keywords'][i]
        if keywords and keywords != 'NaN':
            grades_data[grade][subject][week] = keywords

# Week sorting function
def week_key(w):
    match = re.search(r'\d+', w)
    return int(match.group()) if match else 0

# Sort grades
sorted_grades = sorted(grades_data.items(), key=lambda x: int(re.search(r'\d+', x[0]).group()) if re.search(r'\d+', x[0]) else 0)

# Generate output
output_lines = []

for grade, subjects_dict in sorted_grades:
    output_lines.append(f'# {grade}')
    output_lines.append('')

    # Sort subjects
    for subject in subjects:
        if subject in subjects_dict:
            weeks_dict = subjects_dict[subject]

            output_lines.append(f'## {subject}')
            output_lines.append('')

            # Sort weeks by number
            sorted_weeks = sorted(weeks_dict.items(), key=lambda x: week_key(x[0]))

            for week, keywords in sorted_weeks:
                # Clean up keywords
                keywords_clean = keywords.replace('NaN', '').strip()
                keywords_clean = re.sub(r'\s*,\s*', ', ', keywords_clean)
                keywords_clean = keywords_clean.replace('\\n', '').replace('\n', ' ')
                keywords_clean = keywords_clean.replace('、', ', ')
                keywords_clean = keywords_clean.replace('，', ', ')
                keywords_clean = re.sub(r'\s+', ' ', keywords_clean)
                keywords_clean = keywords_clean.strip(', ')

                # Clean week name (remove "Review Week" text for cleaner display)
                week_display = week.replace('(Review Week)', '').strip()

                if keywords_clean:
                    output_lines.append(f'**Week-{week_display}**: {keywords_clean}')
                    output_lines.append('')

    output_lines.append('---')
    output_lines.append('')

# Write output
with open('2025-2026_Vocabulary_By_Grade_Subject.md', 'w', encoding='utf-8') as f:
    f.write('\n'.join(output_lines))

print('Conversion complete!')
