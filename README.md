# Project-lvl2 version 2.0
# Generator of Differences
[![Build Status](https://travis-ci.org/krivtsov/project-lvl2-s93.svg?branch=master)](https://travis-ci.org/krivtsov/project-lvl2-s93) [![Code Climate](https://codeclimate.com/github/krivtsov/project-lvl2-s93/badges/gpa.svg)](https://codeclimate.com/github/krivtsov/project-lvl2-s93) [![Issue Count](https://codeclimate.com/github/krivtsov/project-lvl2-s93/badges/issue_count.svg)](https://codeclimate.com/github/krivtsov/project-lvl2-s93) [![Test Coverage](https://codeclimate.com/github/krivtsov/project-lvl2-s93/badges/coverage.svg)](https://codeclimate.com/github/krivtsov/project-lvl2-s93/coverage)

## Description
Compares two configuration files and shows a difference.
## Installation
    $ sudo npm i -g gendiff-ver2
## Usage
    $ gendiff [options] <first_config> <second_config>
## Options
    -h, --help          Output usage information
    -V, --version       Output the version number
    -f, --format [type] Output format [plain, string, json]
### Sample

    $ gendiff before.json after.json

```
{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}
```
