

export default function PointA() {
    // JavaScriptでは、オブジェクトやリテラルが値渡しではなく、参照渡しで渡されます。
    PointAA()
    PointAB()
}


function PointAA() {
    const arr = [1, 2, 3]; // [1,2,3]
    console.log(arr);
    let x = arr; // xとarrは同じ配列オブジェクトを参照する
    x.push(4); // xを変更する
    console.log(arr); // [1,2,3,4] arrも変更される
}

function PointAB() {
    const arr = [1, 2, 3];
    let x = [...arr]; // xは新しい配列オブジェクトを参照する
    x.push(4);
    console.log(arr); // [1, 2, 3] - arrは変更されていない
    console.log(x); // [1, 2, 3, 4]
}