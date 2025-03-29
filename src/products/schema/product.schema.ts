import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import slugify from 'slugify';


export type ProductDocument = HydratedDocument<Product>;
@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  title: string;
  @Prop({ unique: true })
  slug: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  price: number;
  @Prop({ required: true })
  quantity: number;
  @Prop({ required: true })
  category: string;
  @Prop({ required: true })
  image: string;
  @Prop({ required: true, default: true })
  isActive: boolean;
  @Prop({ type: Object })
  createdBy: {
    _id: mongoose.Schema.Types.ObjectId,
    email: string,
  };
  @Prop({ type: Object })
  updatedBy: {
    _id: mongoose.Schema.Types.ObjectId,
    email: string,
  };

  @Prop({ type: Object })
  deletedBy: {
    _id: mongoose.Schema.Types.ObjectId,
    email: string,
  };
  @Prop()
  isDeleted: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.pre('save', async function (next) {
  if (this.isModified('title') || this.isNew) {
    let slug = slugify(this.title, { lower: true, strict: true });

    const ProductModel = this.constructor as mongoose.Model<ProductDocument>;

    let exists = await ProductModel.findOne({ slug }).exec();
    let counter = 1;

    while (exists) {
      slug = `${slugify(this.title, { lower: true, strict: true })}-${counter}`;
      exists = await ProductModel.findOne({ slug }).exec();
      counter++;
    }
    this.slug = slug;
  }
  next();
});



