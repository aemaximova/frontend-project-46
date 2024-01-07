### Hexlet tests and linter status:
[![Actions Status](https://github.com/aemaximova/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/aemaximova/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/50f8a6fdc07a9a278a21/maintainability)](https://codeclimate.com/github/aemaximova/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/50f8a6fdc07a9a278a21/test_coverage)](https://codeclimate.com/github/aemaximova/frontend-project-46/test_coverage)
# Project Title

This CLI compare two files in JSON or YAML formats and display the differences in various output formats: stylish, plain, and JSON.

## Features

- Compare files in JSON or YAML formats.
- Display differences in three different output formats: stylish, plain, and JSON.

## Installation

To install and use the application, follow these steps:

1. Clone the repository.
2. Install dependencies using `make install`.

## Usage

The application supports the following commands:

```bash
# Display help information about available commands
$ gendiff -h

# Compare two JSON files in stylish format
$ gendiff file1.json file2.json

# Compare two YAML files in plain format
$ gendiff --format plain file1.yaml file2.yaml 

# Compare a JSON file and a YAML file in JSON format
$ gendiff --format json file1.json file2.yaml 
```

[![asciicast](https://asciinema.org/a/uUMAiwZPrJ9MF26ywVENpbj9i.svg)](https://asciinema.org/a/uUMAiwZPrJ9MF26ywVENpbj9i)
