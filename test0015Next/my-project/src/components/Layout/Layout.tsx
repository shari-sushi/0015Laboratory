import Head from "next/head";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useContext, useState } from "react";

// import { GestLogin, GestLoginForHamburger } from '../button/User'
import { HeaderCss, FooterTW } from '@/styles/tailwiind'
import { ToClickTW } from '@/styles/tailwiind'
// import { getWindowSize } from "@/features/layout/Layout";

type LayoutProps = {
    pageName: string;
    children: any
    isSignin: boolean
}
export const SigninContext = React.createContext({} as {
    isSignin: boolean;
})

export function Layout({ pageName, children, isSignin }: LayoutProps) {
    return (
        <div className="h-full">
            <SigninContext.Provider value={{ isSignin }}>
                <Head>
                    <link rel="icon" href="/shari.ico" />
                    <title>{`V-kara/${pageName}`}</title>
                </Head>
                <Header pageName={pageName} />
                <main className="flex flex-col min-h-screen p-4 pt-8 ">
                    <span className='md:absolute md:right-1 '>
                        <span className="flex-1 "> {pageName}</span>
                        <span className="flex-1 px-1">|</span>
                        <span className="flex-1 ">{isSignin && "ログイン中" || '非ログイン中'}</span>
                    </span>
                    {children}
                </main>
                <Footer />
            </SigninContext.Provider>
        </div >
    );
}

type HeaderProps = {
    pageName: string;
}

const Header = ({ pageName }: HeaderProps) => {
    const pathName = usePathname();
    const { isSignin } = useContext(SigninContext)

    return (
        <header className={`${HeaderCss.regular}`}>
            <a href="#pageTop" />
            <Link href="/" className="flex float-left bg-[#FFF6E4] text-[#000000] font-extrabold px-4 pb-1 pr-6 rounded-br-full ">
                V-kara
            </Link>
            <span className="flex float-right">
                <span className="px-1">
                    <span >
                        <Link href="/" className={`${ToClickTW.regular} mr-1`}>
                            TOP
                        </Link>
                    </span>
                    <span >
                        <Link href="/sings/karaoke" className={`${ToClickTW.regular} mr-1`}>
                            カラオケ
                        </Link>
                    </ span>
                    <span >
                        <Link href="/sings/original-song" className={`${ToClickTW.regular} mr-1`}>
                            オリ曲
                        </Link>
                    </span>/
                </span >

                {isSignin &&
                    <span className="px-1">
                        <span className="pr-1">
                            データの
                        </span>
                        <span className="pr-1">
                            <Link href="/crud/create" className={`${ToClickTW.regular} `}>
                                登録
                            </Link>
                        </span>
                        <span className="pr-1">:</span>
                        <span className="pr-1">
                            <Link href="/crud/edit" className={`${ToClickTW.regular} `}>
                                編集
                            </Link>
                        </span>
                        <span className="pr-1">:</span>
                        <span className="pr-1">
                            <Link href="/crud/delete" className={`${ToClickTW.regular} `}>
                                削除
                            </Link>
                        </span>
                        /
                    </span>
                }

                {!isSignin &&
                    <div className="pr-1">
                        <Link href="/user/signup" className={`${ToClickTW.regular} mr-1`}>
                            会員登録
                        </Link>
                        <span className="pr-1">:</span>
                        <Link href="/user/signin" className={`${ToClickTW.regular} mr-1`}>
                            ログイン
                        </Link>
                        <span className="pr-1">:</span>
                        <GestLogin />
                    </div>
                }

                {isSignin &&
                    <div>
                        <span className="pr-1">
                            <Link href="/user/mypage" className={`${ToClickTW.regular} `}>
                                マイページ
                            </Link>
                        </span>
                        {pathName === "/user/mypage" &&
                            <span >
                                <span className="pr-1">:</span>
                                <Link href="/user/profile" className={`${ToClickTW.regular} px-1`}>
                                    プロフィール
                                </Link>
                            </span>
                        }
                    </div>
                }
            </span>
        </header >
    )
}

const Footer = () => {
    const pathName = usePathname();
    const { isSignin } = useContext(SigninContext)
    return (
        <footer className={`${FooterTW.regular}`}>

            <span className="flex float-right">
                <Link href="/" className="mx-1">TOP</Link>:
                <Link href="/sings/karaoke" className="mx-1">   カラオケ</Link>:
                <Link href="/sings/original-song" className="mx-1">  オリ曲</Link>/
                {isSignin &&
                    <span className="mx-1">
                        <Link href="/crud/create" className="mx-1">登録</Link>:
                        <Link href="/crud/edit" className="mx-1">編集</Link>:
                        <Link href="/crud/delete" className="mx-1">削除</Link>
                        /
                    </span>
                }

                {!isSignin &&
                    <span className="mx-1">
                        <Link href="/user/signup" className="mx-1">会員登録</Link>:
                        <Link href="/user/signin" className="mx-1">ログイン</Link>
                    </span>
                }

                {isSignin &&
                    <span className="">
                        <Link href="/user/mypage" className="mx-1">マイページ</Link>
                        {pathName === "/user/mypage" &&
                            <span>:
                                <Link href="/user/profile" className="mx-1">プロフィール</Link>
                            </span>}
                    </span>
                }
            </span>
            <a id="pageTop" className="flex float-left bg-[#FFF6E4] text-[#000000] font-extrabold px-4 pb-1 pr-6 rounded-tr-full ">
                V-kara
            </a>
        </footer >
    );
}



// //////////////////////
import { useRouter } from 'next/router';
import { domain } from "@/pages/tanstacktable/libs/domain";

export const GetLogout = () => {
    const router = useRouter();
    const fetchLogout = async () => {
        try {
            const response = await fetch(`${domain.backendHost}/users/logout`, {
                method: 'PUT',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            console.log("logout response:", response);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
        } catch (error) {
            console.error(error);
        }
        router.push(`/`)
    };
    return (
        <Link href="">
            <button onClick={fetchLogout} className={`${ToClickTW.regular}`}>ログアウト</button>
        </Link>
    )
};

export const Withdraw = () => {
    const router = useRouter();
    const [isToDecision, setIsToDecision] = useState<boolean>(false)
    const fetchWithdraw = async () => {
        try {
            const response = await fetch(`${domain.backendHost}/users/withdraw`, {
                method: 'DELETE',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            console.log("withdraw response:", response);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
        } catch (error) {
            console.error(error);
        }
        router.push(`/`)
    };
    return (
        <div>
            {!isToDecision &&
                <div>
                    <button className={`${ToClickTW.regular}`}
                        onClick={() => setIsToDecision(!isToDecision)}
                    >
                        退会ボタンを開く</button>
                </div>}
            {isToDecision && <div> <br />
                <h2>退会について</h2>
                <li>・メールアドレスとパスワードは30日間の保管の後、完全に削除されます。</li>
                <li>・保管期間中はアカウントを復元できます。</li>
                <li>・削除されたアカウントが登録したVtuberや動画等の登録データはサイト運営によって管理されます。</li>
                <li>・ゲストアカウントは退会できません。</li>
                <br />
                <button onClick={fetchWithdraw} className={`${ToClickTW.regular}`}>
                    退会確定
                </button>
                <button onClick={() => setIsToDecision(!isToDecision)} className={`${ToClickTW.regular} mx-1`} >
                    キャンセル
                </button>
            </div>}
        </div>
    )
};

export const GestLoginWithStyle = (decoration: { decoration: string }) => {
    const router = useRouter();
    const fetchWithdraw = async () => {
        try {
            const response = await fetch(`${domain.backendHost}/users/gestlogin`, {
                method: 'get',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (response.status != 200) {
                throw new Error(response.statusText);
            }
        } catch (error) {
            console.error(error);
        }
        router.push(`/`)
    };
    return (
        <button className={decoration.decoration}
            onClick={fetchWithdraw} >
            ゲストログイン
        </button>
    )
};

export const GestLogin = () => {
    const router = useRouter();
    const fetchWithdraw = async () => {
        try {
            const response = await fetch(`${domain.backendHost}/users/gestlogin`, {
                method: 'get',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (response.status != 200) {
                throw new Error(response.statusText);
            }
        } catch (error) {
            console.error(error);
        }
        router.push(`/`)
    };
    return (
        <button className={`${ToClickTW.regular} `}
            onClick={fetchWithdraw} >
            ゲストログイン
        </button >
    )
};

export const GestLoginForHamburger = () => {
    const router = useRouter();
    const fetchWithdraw = async () => {
        try {
            const response = await fetch(`${domain.backendHost}/users/gestlogin`, {
                method: 'get',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (response.status != 200) {
                throw new Error(response.statusText);
            }
        } catch (error) {
            console.error(error);
        }
        router.push(`/`)
    };
    return (
        <button className={`${ToClickTW.hamburger} my-1 `}
            onClick={fetchWithdraw} >
            <div className={`flex ml-5 sm:my-2 my-[4px] `} >
                ゲストログイン
            </div>
        </button >
    )
};
