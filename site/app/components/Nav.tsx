import { observer } from "mobx-react-lite"
import { splatterBus2 } from "../utils/PaintSplatter"

const Nav = observer(() => {

    return <div className="fixed z-50 top-6 right-6">
        <nav className='flex flex-col gap-3 flex-wrap'>
            <a className='px-3 py-1.5 text-amber-50 uppercase font-heading-1 opacity-60 hover:opacity-100 transition-opacity duration-150 cursor-pointer'>
                Nav
            </a>
        </nav>
    </div>
})

export default Nav