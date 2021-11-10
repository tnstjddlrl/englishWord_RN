import { atom } from "recoil";

export const atomId = atom({
    key: 'atomId',
    default: '',
});

export const atomGrade = atom({
    key: 'atomGrade',
    default: '',
});

export const atomAxQuestion = atom({
    key: 'atomAxQuestion',
    default: [],
});

export const atomAxAnswer = atom({
    key: 'atomAxAnswer',
    default: [],
});