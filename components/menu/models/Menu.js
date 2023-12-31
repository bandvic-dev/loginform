import { Schema, Model, model } from "mongoose";

const Menu = new Schema({
    title: {type: String, required: true},
    alias: {type: String, unique: true, required: true},
})

export default model('Menu', Menu)
