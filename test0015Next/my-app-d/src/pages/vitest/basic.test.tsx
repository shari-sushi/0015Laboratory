// コード
// https://zenn.dev/collabostyle/articles/15883dcd38c9ff

// 設定ファイル
// https://qiita.com/na2na/items/1dc75176fd37273465cd

// test libraly React
// https://testing-library.com/docs/react-testing-library/example-intro


import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";

import Button from "./sample";

test("Buttonに文字が表示されること", async () => {
    render(<Button>Button</Button>);

    expect(screen.getByText("Button")).toBeTruthy();
});

test("Buttonロールであること", async () => {
    render(<Button>Button</Button>);

    expect(screen.getByRole("button").textContent).toBe("Button");
});

test("クリックするとonClick()が実行されること", async () => {
    const onClickMock = vi.fn(() => { });

    render(<Button onClick={onClickMock}>Button</Button>);
    expect(onClickMock).toHaveBeenCalledTimes(0);

    const button = screen.getByRole("button");
    await fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalledTimes(1);
    await fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(2);
});

test("ボタンの背景色がしろであること", async () => {
    render(<Button>Button</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveStyle("background-color: rgb(255, 255, 255)");
});

test("disabledをtureにするとボタンがクリック出来なくなること", async () => {
    const onClickMock = vi.fn(() => { });

    render(
        <Button disabled={true} onClick={onClickMock}>
            Button
        </Button>
    );

    const button = screen.getByRole("button");
    await fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalledTimes(0);
});