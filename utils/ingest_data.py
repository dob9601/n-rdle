import argparse
import os

TARGET_FILES = ['data.adj', 'data.adv', 'data.verb', 'data.noun']
INVALID_SUBSTRINGS = ['_', '.', '-']

def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description='Ingest data from WordNet for use with n-rdle')

    parser.add_argument('-i', '--input-dir')
    parser.add_argument('-o', '--output')

    parser.add_argument('-m', '--max-words')
    return parser.parse_args()


def is_word_valid(word: str) -> bool:
    if any(invalid_substr in word for invalid_substr in INVALID_SUBSTRINGS):
        return False
    return True


def main():
    args = parse_args()

    for filename in TARGET_FILES:
        path = os.path.join(args.input_dir, filename)
        with open(path, 'r') as file:
            for line in file:
                if line.startswith('  '):
                    # Skip lines leading with 2 spaces, these are basically comments
                    continue

                word = line.split(' ')[4]
                if not is_word_valid(word):
                    # Go to next word if word is invalid
                    continue
