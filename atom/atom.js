import { atom } from "recoil";

export const atomId = atom({
    key: 'atomId',
    default: '',
});

export const atomGrade = atom({
    key: 'atomGrade',
    default: '',
});

//////////////////////////////////////////////////////////
//문제 암기후 파이널로 넘기기용
export const atomAxQuestion = atom({
    key: 'atomAxQuestion',
    default: [],
});

export const atomAxAnswer = atom({
    key: 'atomAxAnswer',
    default: [],
});
///////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////
//저장문제 불러온후 배열 저장용
export const atomIsSaveWord = atom({
    key: 'atomIsSaveWord',
    default: false,
});

export const atomSaveQuestion = atom({
    key: 'atomSaveQuestion',
    default: [],
});

export const atomSaveAnswer = atom({
    key: 'atomSaveAnswer',
    default: [],
});
/////////////////////////////////////////////////////////////
