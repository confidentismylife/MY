import {makeInstaller} from "../utils/install"
import components from "./components"
import  "@toy-element/theme/index.css"

const installer =makeInstaller(components)

export * from "./components"
export default installer