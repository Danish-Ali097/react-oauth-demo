import React, { ChangeEventHandler, InputHTMLAttributes } from "react";

interface IInputParams extends InputHTMLAttributes<HTMLElement> {
    id: string,
    label?: string,
    type:string,
    placeholder?: string,
    name:string,
    value:string,
    onChange: ChangeEventHandler<HTMLInputElement>
}

const Input: React.FC<IInputParams> = ({ id, label, ...rest }) => {

    return (
        <>
            {
                label ?
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor={id}>
                                {label}
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input id={id} {...rest} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"></input>
                        </div>
                    </div>
                    :
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-full">
                            <input id={id} {...rest} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"></input>
                        </div>
                    </div>
            }
        </>
    );

}

export default Input;