import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import slugify from 'slugify';

export type CategoryDocument = HydratedDocument<Category>;
@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  image: string;
  @Prop({ unique: true })
  slug: string;

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

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.pre('save', async function (next) {
  if (this.isModified('title') || this.isNew) {
    let slug = slugify(this.title, { lower: true, strict: true });
    const ProductModel = this.constructor as mongoose.Model<CategoryDocument>;
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
