import chalk from "chalk"
import {fileURLToPath} from "url"
import { dirname } from "path"



console.log(chalk.blue("hello world"))


const __filename = fileURLToPath(import.meta.url)
const __dirname  =dirname(__filename)



// console.log(__dirname)