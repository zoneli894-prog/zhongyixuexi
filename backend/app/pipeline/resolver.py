import json
import os

_DICT_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "alias_dict.json")

_herb_aliases: dict[str, str] = {}
_microbe_aliases: dict[str, str] = {}
_reverse_herb: dict[str, list[str]] = {}
_reverse_microbe: dict[str, list[str]] = {}


def _load():
    global _herb_aliases, _microbe_aliases, _reverse_herb, _reverse_microbe
    if _herb_aliases:
        return
    try:
        with open(_DICT_PATH, "r", encoding="utf-8") as f:
            data = json.load(f)
        _herb_aliases = data.get("herb_aliases", {})
        _microbe_aliases = data.get("microbe_aliases", {})
        _reverse_herb = {}
        for alias, canonical in _herb_aliases.items():
            _reverse_herb.setdefault(canonical, []).append(alias)
        _reverse_microbe = {}
        for alias, canonical in _microbe_aliases.items():
            _reverse_microbe.setdefault(canonical, []).append(alias)
    except FileNotFoundError:
        pass


def resolve_herb(name: str) -> str:
    _load()
    return _herb_aliases.get(name, name)


def resolve_microbe(name: str) -> str:
    _load()
    return _microbe_aliases.get(name, name)


def get_herb_aliases(canonical: str) -> list[str]:
    _load()
    return _reverse_herb.get(canonical, [])


def get_microbe_aliases(canonical: str) -> list[str]:
    _load()
    return _reverse_microbe.get(canonical, [])


def resolve_entity(name: str, entity_type: str = "herb") -> tuple[str, bool]:
    _load()
    aliases = _herb_aliases if entity_type == "herb" else _microbe_aliases
    if name in aliases:
        return aliases[name], True
    return name, False
