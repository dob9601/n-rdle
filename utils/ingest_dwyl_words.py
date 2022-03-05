# Designed to ingest https://github.com/dwyl/english-words

import argparse
import os
from typing import DefaultDict, TextIO
from utils.ingest import is_word_valid

def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description='Ingest data from https://github.com/dwyl/english-words for use with n-rdle'
    )

    parser.add_argument('-i', '--input', required=True)
    parser.add_argument('-o', '--output-dir', required=True)

    parser.add_argument('-m', '--max-words', required=False)  # TODO: Implement
    parser.add_argument(
        '-r',
        '--length-range',
        default='3-18',
        help='The range of length of words to consider in the format min-max',
        required=False
    )
    return parser.parse_args()


def parse_dwyl_words(file: TextIO) -> dict[int, list[str]]:
    words: dict[int, list[str]] = DefaultDict(list)

    for line in file:
        word = line.strip()
        if is_word_valid(word):
            words[len(word)].append(word.lower())

    return words


def main():
    args = parse_args()
    os.makedirs(args.output_dir, exist_ok=True)

    words: dict[int, list[str]] = {}

    with open(args.input, 'r') as file:
        valid_words = parse_dwyl_words(file)
        words |= valid_words

    min, max = map(int, args.length_range.split('-'))
    for i in range(min, max + 1):
        words_at_length = words.get(i)

        if words_at_length is None:
            print(f'Warning: Skipping length {i} as no words found at length')
            continue

        output_path = os.path.join(args.output_dir, f'{i}.txt')

        with open(output_path, 'w') as file:
            print(
                f'Dumping {len(words_at_length)} words with length {i} into {output_path}'
            )
            file.write('\n'.join(words_at_length))


if __name__ == '__main__':
    main()
