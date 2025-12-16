import { makeAutoObservable } from "mobx";
import type { WatchSection } from "./WatchSection";

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