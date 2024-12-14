import React, { cloneElement } from 'react'

const Side = ({ children, content, ...rest }) => {
  return (
    <>
    <div className="grid lg:grid-cols-3 h-full">
            <div
                className="bg-no-repeat bg-cover py-6 px-16 flex-col justify-between hidden lg:flex dark:bg-[#0096af] bg-[#553A48]"
            >
                {/* <Logo mode="dark" type='fullll' borderRadius='0'/> */}
                <div>
                    <div className="mb-6 flex items-center gap-4">
                        {/* <Avatar
                            className="border-2 border-white"
                            shape="circle"
                            src="/img/avatars/thumb-10.jpg"
                        /> */}
                        <div className="text-white">
                            <div className="font-semibold text-base">
                                Ted Ovid
                            </div>
                            <span className="opacity-80">CEO</span>
                        </div>
                    </div>
                    <p className="text-lg text-white opacity-80 font-extralight text-[16px]">
                    Welcome to Nulou Technologies, your trusted partner in delivering innovative products. Log in to access our secure portal and explore a seamless experience. "Together, we build a smarter future".
                    </p>
                </div>
                <span className="text-white">
                    Copyright &copy; {`${new Date().getFullYear()}`}{' '}
                    <span className="font-semibold">{`hjello`}</span>{' '}
                </span>
            </div>
            <div className="col-span-2 flex flex-col justify-center items-center bg-white dark:bg-gray-800">
                <div className="w-full xl:max-w-[450px] px-8 max-w-[380px]">
                    <div className="mb-8">{content}</div>
                    {children
                        ? cloneElement(children, {
                              ...rest,
                          })
                        : null}
                </div>
            </div>
        </div>
    </>
  )
}

export default Side