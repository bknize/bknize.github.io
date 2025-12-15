import type { WatchSection } from "~/utils/WatchSection";
import { observer } from "mobx-react-lite"
import { makeAutoObservable } from "mobx"
import { debounce } from "./debounce";


class SplatterBus {
    currentSection: Partial<WatchSection> = {
        name: '',
        sprite: '',
        paint: '',
    }

    constructor() {
        makeAutoObservable(this)
    }

    setSection(section: WatchSection) {
        this.currentSection = {...section}
    }

    get section() {
        return this.currentSection
    }
}

export default SplatterBus;