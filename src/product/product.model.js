import { model, Schema} from "mongoose"

const productSchema = Schema({
    name:{
        type: String,
        required: [true, "name is required"],
        maxLength:[25, "Name cannot exceed 25 characters" ]
    },
    description:{
        type: String,
        required: [true, "Description is required"],
        maxLength:[50, "Description cannot exceed 50 characters" ]

    },
    price:{
        type: Number,
        required: [true, "price is required"]
    },
    stock:{
        type: Number,
        required: true
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true

    },
    status:{
        type: Boolean,
        default: true

    }
})


export default model("Product", productSchema)