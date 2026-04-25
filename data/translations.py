"""
Chinese translations for vocabulary words
Used by the question generator for explanations
"""

from typing import Dict, Any

# Common vocabulary translations
# This is a subset of the full translations, focusing on words from our vocabulary data
TRANSLATIONS: Dict[str, Dict[str, str]] = {
    # Maths
    'triangle': {'cn': '三角形', 'ipa': '/ˈtraɪæŋɡl/', 'read': 'TRY-ang-guhl'},
    'square': {'cn': '正方形', 'ipa': '/skweə(r)/', 'read': 'skwair'},
    'minus': {'cn': '减去', 'ipa': '/ˈmaɪnəs/', 'read': 'MY-nuhs'},
    'number': {'cn': '数字', 'ipa': '/ˈnʌmbə(r)/', 'read': 'NUHM-ber'},
    'plus': {'cn': '加', 'ipa': '/plʌs/', 'read': 'pluhs'},
    'more': {'cn': '更多', 'ipa': '/mɔː(r)/', 'read': 'mahr'},
    'less': {'cn': '更少', 'ipa': '/les/', 'read': 'less'},
    'together': {'cn': '一起', 'ipa': '/təˈɡeðə(r)/', 'read': 'tu-GE-ther'},
    'difference': {'cn': '差值', 'ipa': '/ˈdɪfrəns/', 'read': 'DI-fruhns'},
    'price': {'cn': '价格', 'ipa': '/praɪs/', 'read': 'prahys'},
    'money': {'cn': '金钱', 'ipa': '/ˈmʌni/', 'read': 'MUHN-ee'},
    'total': {'cn': '总和', 'ipa': '/ˈtəʊtl/', 'read': 'TOHT-uhl'},
    'multiply': {'cn': '乘以', 'ipa': '/ˈmʌltɪplaɪ/', 'read': 'MUHL-ti-ply'},
    'divide': {'cn': '除以', 'ipa': '/dɪˈvaɪd/', 'read': 'di-VAHYD'},
    'fraction': {'cn': '分数', 'ipa': '/ˈfrækʃn/', 'read': 'FRAK-shuhn'},
    'decimal': {'cn': '小数', 'ipa': '/ˈdesɪml/', 'read': 'DES-uh-muhl'},
    'half': {'cn': '一半', 'ipa': '/hɑːf/', 'read': 'hahf'},
    'quarter': {'cn': '四分之一', 'ipa': '/ˈkwɔːtə(r)/', 'read': 'KWOR-ter'},
    'add': {'cn': '加', 'ipa': '/æd/', 'read': 'ad'},
    'subtract': {'cn': '减', 'ipa': '/səbˈtrækt/', 'read': 'suhb-TRAKT'},
    'area': {'cn': '面积', 'ipa': '/ˈeəriə/', 'read': 'AIR-ee-uh'},
    'perimeter': {'cn': '周长', 'ipa': '/pəˈrɪmɪtə(r)/', 'read': 'puh-RIM-i-tuh'},
    'angle': {'cn': '角', 'ipa': '/ˈæŋɡl/', 'read': 'ANG-guhl'},
    'volume': {'cn': '体积', 'ipa': '/ˈvɒljuːm/', 'read': 'VOL-yoom'},
    'century': {'cn': '世纪', 'ipa': '/ˈsentʃəri/', 'read': 'SEN-chuh-ree'},
    'factor': {'cn': '因数', 'ipa': '/ˈfæktə(r)/', 'read': 'FAK-ter'},
    'multiple': {'cn': '倍数', 'ipa': '/ˈmʌltɪpl/', 'read': 'MUHL-ti-puhl'},

    # Science
    'compare': {'cn': '比较', 'ipa': '/kəmˈpeə(r)/', 'read': 'kuhm-PAIR'},
    'grow': {'cn': '生长', 'ipa': '/ɡrəʊ/', 'read': 'groh'},
    'human': {'cn': '人类', 'ipa': '/ˈhjuːmən/', 'read': 'HYOO-muhn'},
    'measure': {'cn': '测量', 'ipa': '/ˈmeʒə(r)/', 'read': 'MEZH-er'},
    'healthy': {'cn': '健康的', 'ipa': '/ˈhelθi/', 'read': 'HEL-thee'},
    'teeth': {'cn': '牙齿', 'ipa': '/tiːθ/', 'read': 'teeth'},
    'light': {'cn': '光', 'ipa': '/laɪt/', 'read': 'lahyt'},
    'source': {'cn': '来源', 'ipa': '/sɔːs/', 'read': 'sawrs'},
    'reflect': {'cn': '反射', 'ipa': '/rɪˈflekt/', 'read': 'ri-FLEKT'},
    'darkness': {'cn': '黑暗', 'ipa': '/ˈdɑːknəs/', 'read': 'DAHRK-nuhs'},
    'electricity': {'cn': '电', 'ipa': '/ɪˌlekˈtrɪsəti/', 'read': 'ih-LEK-tris-i-tee'},
    'safety': {'cn': '安全', 'ipa': '/ˈseɪfti/', 'read': 'AYF-tee'},
    'organ': {'cn': '器官', 'ipa': '/ˈɔːɡən/', 'read': 'OR-guhn'},
    'force': {'cn': '力', 'ipa': '/fɔːs/', 'read': 'fawrs'},
    'gravity': {'cn': '重力', 'ipa': '/ˈɡrævəti/', 'read': 'GRAV-i-tee'},
    'magnet': {'cn': '磁铁', 'ipa': '/ˈmæɡnət/', 'read': 'MAG-nit'},
    'orbit': {'cn': '轨道', 'ipa': '/ˈɔːbɪt/', 'read': 'OR-bit'},
    'fossil': {'cn': '化石', 'ipa': '/ˈfɒsl/', 'read': 'FOS-uhl'},

    # STEAM
    'algorithm': {'cn': '算法', 'ipa': '/ˈælɡərɪðəm/', 'read': 'AL-guh-rith-uhm'},
    'code': {'cn': '代码', 'ipa': '/kəʊd/', 'read': 'kohd'},
    'program': {'cn': '程序', 'ipa': '/ˈprəʊɡræm/', 'read': 'PROH-gram'},
    'variable': {'cn': '变量', 'ipa': '/ˈveəriəbl/', 'read': 'VAIR-ee-uh-buhl'},
    'database': {'cn': '数据库', 'ipa': '/ˈdeɪtəbeɪs/', 'read': 'DAY-tuh-bees'},
    'network': {'cn': '网络', 'ipa': '/ˈnetwɜːk/', 'read': 'NET-wurk'},
    'input': {'cn': '输入', 'ipa': '/ˈɪnpʊt/', 'read': 'IN-poot'},
    'output': {'cn': '输出', 'ipa': '/ˈaʊtpʊt/', 'read': 'OWT-poot'},
    'binary': {'cn': '二进制', 'ipa': '/ˈbaɪnəri/', 'read': 'BY-nuh-ree'},
    'spreadsheet': {'cn': '电子表格', 'ipa': '/ˈspredʃiːt/', 'read': 'SPRED-sheet'},
    'chart': {'cn': '图表', 'ipa': '/tʃɑːt/', 'read': 'chahrt'},

    # Music
    'instrument': {'cn': '乐器', 'ipa': '/ˈɪnstrəmənt/', 'read': 'IN-struh-muhnt'},
    'pattern': {'cn': '模式/节奏型', 'ipa': '/ˈpætn/', 'read': 'PAT-ern'},
    'stage': {'cn': '舞台', 'ipa': '/steɪdʒ/', 'read': 'ayj'},
    'perform': {'cn': '表演', 'ipa': '/pəˈfɔːm/', 'read': 'per-FAWRM'},
    'practice': {'cn': '练习', 'ipa': '/ˈpræktɪs/', 'read': 'PRAK-tis'},
    'rhythm': {'cn': '节奏', 'ipa': '/ˈrɪðəm/', 'read': 'RITH-uhm'},
    'melody': {'cn': '旋律', 'ipa': '/ˈmelədi/', 'read': 'MEL-uh-dee'},
    'tempo': {'cn': '速度', 'ipa': '/ˈtempəʊ/', 'read': 'TEM-poh'},
    'beat': {'cn': '拍子', 'ipa': '/biːt/', 'read': 'beet'},
    'harmony': {'cn': '和声', 'ipa': '/ˈhɑːməni/', 'read': 'HAHR-muh-nee'},

    # Drama
    'character': {'cn': '角色', 'ipa': '/ˈkærəktə(r)/', 'read': 'KAR-uk-ter'},
    'dialogue': {'cn': '对话', 'ipa': '/ˈdaɪəlɒɡ/', 'read': 'DAHY-uh-log'},
    'script': {'cn': '剧本', 'ipa': '/skrɪpt/', 'read': 'skript'},
    'scene': {'cn': '场景', 'ipa': '/siːn/', 'read': 'seen'},
    'actor': {'cn': '演员', 'ipa': '/ˈæktə(r)/', 'read': 'AK-ter'},
    'play': {'cn': '戏剧', 'ipa': '/pleɪ/', 'read': 'play'},
    'stage directions': {'cn': '舞台指示', 'ipa': '/steɪdʒ dəˈrek�nz/', 'read': 'ayj duh-REK-shuhnz'},
    'emotions': {'cn': '情绪', 'ipa': '/ɪˈməʊ�nz/', 'read': 'ih-MOH-shuhnz'},
    'lines': {'cn': '台词', 'ipa': '/laɪnz/', 'read': 'lahynz'},

    # Performing Arts
    'gymnastics': {'cn': '体操', 'ipa': '/dʒɪmˈnæstɪks/', 'read': 'jim-NAS-tiks'},
    'cartwheel': {'cn': '侧手翻', 'ipa': '/ˈkɑːtwiːl/', 'read': 'KAHRT-weel'},
    'stretch': {'cn': '拉伸', 'ipa': '/stretʃ/', 'read': 'strech'},
    'dance': {'cn': '舞蹈', 'ipa': '/dɑːns/', 'read': 'dahns'},
    'choreography': {'cn': '编舞', 'ipa': '/ˌkɒriˈɒɡrəfi/', 'read': 'kor-ee-OG-ruh-fee'},
    'costume': {'cn': '服装', 'ipa': '/ˈkɒstjuːm/', 'read': 'KOS-toom'},
    'movement': {'cn': '动作', 'ipa': '/ˈmuːvmənt/', 'read': 'MOOV-muhnt'},

    # Visual Arts
    'sculpture': {'cn': '雕塑', 'ipa': '/ˈskʌlptʃə(r)/', 'read': 'SKULP-cher'},
    'portrait': {'cn': '肖像', 'ipa': '/ˈpɔːtreɪt/', 'read': 'PORT-rayt'},
    'landscape': {'cn': '风景', 'ipa': '/ˈlændskeɪp/', 'read': 'LAND-skayp'},
    'collage': {'cn': '拼贴画', 'ipa': '/kɒˈlɑːʒ/', 'read': 'kuh-LAHZH'},
    'mosaic': {'cn': '马赛克', 'ipa': '/məʊˈzeɪɪk/', 'read': 'moh-ZAY-ik'},
    'sketch': {'cn': '素描', 'ipa': '/sketʃ/', 'read': 'skech'},
    'paint': {'cn': '绘画', 'ipa': '/peɪnt/', 'read': 'paynt'},
    'color': {'cn': '颜色', 'ipa': '/ˈkʌlə(r)/', 'read': 'KUHL-er'},
    'texture': {'cn': '纹理', 'ipa': '/ˈtekstʃə(r)/', 'read': 'TEKS-cher'},
    'design': {'cn': '设计', 'ipa': '/dɪˈzaɪn/', 'read': 'di-ZYN'},
    'layout': {'cn': '布局', 'ipa': '/ˈlaɪaʊt/', 'read': 'LAY-out'},

    # PE
    'teamwork': {'cn': '团队合作', 'ipa': '/ˈtiːmwɜːk/', 'read': 'TEEM-wurk'},
    'communication': {'cn': '沟通', 'ipa': '/kəˌmjuːnɪˈkeɪʃn/', 'read': 'kuh-MYOO-ni-KAY-shun'},
    'cheer': {'cn': '欢呼', 'ipa': '/tʃɪə(r)/', 'read': 'cheer'},
    'bounce': {'cn': '弹跳', 'ipa': '/baʊns/', 'read': 'bowns'},
    'relay': {'cn': '接力', 'ipa': '/ˈriːleɪ/', 'read': 'REE-lay'},
    'sprint': {'cn': '冲刺', 'ipa': '/sprɪnt/', 'read': 'sprint'},
    'save': {'cn': '扑救', 'ipa': '/seɪv/', 'read': 'sayv'},
    'strategy': {'cn': '策略', 'ipa': '/ˈstrætədʒi/', 'read': 'STRAT-uh-jee'},
    'endurance': {'cn': '耐力', 'ipa': '/ɪnˈdjʊərəns/', 'read': 'in-DYOOR-uhns'},
    'stamina': {'cn': ' stamina', 'ipa': '/ˈstæmɪnə/', 'read': 'STAM-uh-nuh'},
}


def get_translation(keyword: str) -> Dict[str, str] | None:
    """Get translation for a keyword."""
    # Try exact match
    if keyword in TRANSLATIONS:
        return TRANSLATIONS[keyword]

    # Try case-insensitive match
    kw_lower = keyword.lower()
    for key, value in TRANSLATIONS.items():
        if key.lower() == kw_lower:
            return value

    # Try partial match
    for key, value in TRANSLATIONS.items():
        if kw_lower in key.lower() or key.lower() in kw_lower:
            return value

    return None


def get_chinese(keyword: str) -> str:
    """Get Chinese translation for a keyword."""
    trans = get_translation(keyword)
    return trans['cn'] if trans else ''


def get_all_keywords() -> list:
    """Get list of all keywords with translations."""
    return list(TRANSLATIONS.keys())


if __name__ == "__main__":
    # Test translations
    print(f"Total translations: {len(TRANSLATIONS)}")
    print(f"Sample: triangle = {get_chinese('triangle')}")
    print(f"Sample: algorithm = {get_chinese('algorithm')}")
