import { useDataFile } from './../../../hooks/useDataFile'
import yaml from 'yaml'
import fs from 'fs'

import type { Config } from './../types/config'

const { getFile } = useDataFile('template-plugins')

const defaultConfig = fs.readFileSync(__dirname + './../template/_config.yaml', 'utf-8')

export const config = yaml.parse(getFile('./config.yaml', defaultConfig)) as Config
