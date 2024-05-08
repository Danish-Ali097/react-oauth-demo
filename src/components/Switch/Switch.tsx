import { ChangeEventHandler, InputHTMLAttributes } from "react";

interface ISwitch extends InputHTMLAttributes<HTMLElement> {
    name: string,
    checkedLabel: string,
    unCheckedLabel: string,
    onChange: ChangeEventHandler<HTMLInputElement>
}

function Switch({ checkedLabel, unCheckedLabel, ...rest }: ISwitch) {
    return (
        <>
            <label className="relative inline-flex items-center cursor-pointer mb-3 md:left-6">
                <input className="sr-only peer" {...rest} type="checkbox"></input>
                <div className="peer rounded-full outline-none duration-100 after:duration-500 w-80 h-10 bg-blue-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500  after:content-['Phone'] after:absolute after:outline-none after:rounded-full after:h-8 after:w-40 after:bg-white after:top-1 after:left-2 after:flex after:justify-center after:items-center  after:text-sky-800 after:font-bold peer-checked:after:translate-x-36 peer-checked:after:content-['Email'] peer-checked:after:border-white">
                </div>
            </label>
        </>
    )
}

export default Switch;