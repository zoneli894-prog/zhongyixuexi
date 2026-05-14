from sqlalchemy.orm import Session
from app.models import Herb, Microbe, Disease, Syndrome, Formula

TCM_BRIDGES = {
    "脓肿": ("热毒炽盛证", "五味消毒饮"),
    "肺炎": ("痰热壅肺证", "麻杏石甘汤"),
    "尿路感染": ("湿热下注证", "八正散"),
    "腹泻": ("湿热蕴脾证", "葛根芩连汤"),
    "痢疾": ("大肠湿热证", "芍药汤"),
    "脑膜炎": ("热入心包证", "清营汤"),
    "败血症": ("热入营血证", "犀角地黄汤"),
    "肝炎": ("肝胆湿热证", "茵陈蒿汤"),
    "胃炎": ("脾胃湿热证", "半夏泻心汤"),
    "结膜炎": ("肝经风热证", "银翘散"),
    "疖": ("热毒炽盛证", "五味消毒饮"),
    "痈": ("热毒炽盛证", "五味消毒饮"),
    "丹毒": ("火毒炽盛证", "普济消毒饮"),
    "咽喉炎": ("风热犯肺证", "银翘散"),
    "扁桃体炎": ("风热犯肺证", "银翘散"),
    "中耳炎": ("肝胆湿热证", "龙胆泻肝汤"),
    "牙周炎": ("胃火炽盛证", "清胃散"),
    "皮肤感染": ("湿热蕴肤证", "萆薢渗湿汤"),
    "真菌感染": ("湿热蕴结证", "二妙散"),
    "疟疾": ("疟疾", "青蒿鳖甲汤"),
}


def auto_link_microbe_to_tcm(db: Session):
    microbes = db.query(Microbe).all()
    linked_count = 0
    for microbe in microbes:
        if microbe.tcm_correlation:
            continue
        if not microbe.clinical_diseases:
            continue
        diseases = microbe.clinical_diseases
        for keyword, (syndrome_name, formula_name) in TCM_BRIDGES.items():
            if keyword in diseases:
                syndrome = db.query(Syndrome).filter(Syndrome.name == syndrome_name).first()
                formula = db.query(Formula).filter(Formula.name == formula_name).first()
                if syndrome and formula:
                    microbe.tcm_correlation = f"临床表现含'{keyword}'，对应{syndrome_name}，可考虑{formula_name}"
                    linked_count += 1
                    break
    db.commit()
    return linked_count


def auto_link_herbs_aliases(db: Session):
    from app.pipeline.resolver import get_herb_aliases
    herbs = db.query(Herb).all()
    updated = 0
    for herb in herbs:
        if herb.aliases:
            continue
        aliases = get_herb_aliases(herb.name)
        if aliases:
            herb.aliases = ",".join(aliases)
            updated += 1
    db.commit()
    return updated


def auto_link_microbes_aliases(db: Session):
    from app.pipeline.resolver import get_microbe_aliases
    microbes = db.query(Microbe).all()
    updated = 0
    for microbe in microbes:
        if microbe.aliases:
            continue
        aliases = get_microbe_aliases(microbe.name)
        if aliases:
            microbe.aliases = ",".join(aliases)
            updated += 1
    db.commit()
    return updated
