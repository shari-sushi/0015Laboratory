import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
    singStart: string;
};

export default function Demo() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>();

    const [singStart, setSingStartInput] = useState("")
    const time = AdjustSingStart(singStart)

    let texts = [""]
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        setSingStartInput(data.singStart);
        texts = texts.push(singStart)
    };

    return (
        <div>
            <br />

            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...register("singStart", {
                        required: true
                    })}
                    placeholder={singStart || "例 00:05:30"}
                    onChange={e => setSingStartInput(e.target.value)}
                /><br />
                {errors.singStart && <p>{errors.singStart.message}</p>} {/* エラーメッセージ表示 */}
                <br />
                <button type="submit">Submit</button>
            </form>
            {texts}
        </div>
    );
};

export function ConvertTime() {
    const { register, handleSubmit, formState: { errors } } = useForm<any>();

    const [singStart, setSingStartInput] = useState("")
    const time = AdjustSingStart(singStart)
    return (
        <>
            <input {...register("SingStart", { required: true })} placeholder={singStart || "例 00:05:30"}
                onChange={e => setSingStartInput(e.target.value)}
            /><br />
            <button onClick={() => AdjustSingStart("")}>変換</button>
            {errors.SingStart && "開始時間は必要です"}
        </>
    )
}


export const StartPattern = /^([0-9]{2}:)?([0-9]{2}:)?[0-9]{2}$/;

export const AdjustSingStart = (input: string): string => {
    const match = input.match(`${StartPattern}`);

    if (match?.length == 0 || match?.length == null) {
        return ""
    } else if (match.length == 3) {
        return input
    } else if (match.length == 2) {
        return "00" + match[1] + match[3];
    } else if (match.length == 1) {
        const number = Number(match[1]);
        const seconds = number % 60;
        if (number > 60 * 60) {
            const minutes = number % 60;
            const hours = Math.floor(number / 60 * 60);
            return String(hours) + String(minutes) + String(seconds)
        } else if (number > 60) {
            const minutes = Math.floor(number / 60);
            return "00:" + String(minutes) + String(seconds)
        } else if (number > 9) {
            return "00:00:" + String(number)
        } else {
            return "00:00:0" + String(number)
        }
    };
    return ""
}

export const ValidationRulesForStartPattern = {
    required: false,
    pattern: {
        value: new RegExp(`(${StartPattern})`),
        message: "hh:mm:ss, mm:ss, ss(秒換算),のいずれかで入力してください",
        transform: (value: string) => AdjustSingStart(value)
    }
};
