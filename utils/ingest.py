INVALID_SUBSTRINGS = ['_', '.', '-']


def is_word_valid(word: str) -> bool:
    if any(invalid_substr in word for invalid_substr in INVALID_SUBSTRINGS):
        return False
    return True
