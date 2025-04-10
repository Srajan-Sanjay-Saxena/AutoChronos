import dotenv from 'dotenv';
dotenv.config({path : '../config/config'});
import mongoose from 'mongoose';
import type { CommandNamespace } from '../Types/model.types.js';

export class ApiFeatures{
  public query: any;
  public queryString: Record<string, any>;
  constructor(query: mongoose.Query<any , CommandNamespace.CommandDoc>, queryString: Record<string, any>) {
    this.queryString = queryString;
    this.query = query;
  }

  filter() {
    let queryObj = { ...this.queryString };
    const excludedFields = ["sort", "limit", "fields", "page"];
    excludedFields.forEach((field) => delete queryObj[field]);
    queryObj = JSON.parse(
      JSON.stringify(queryObj).replace(
        /\b(gt | gte |lt|lte)\b/,
        (match) => `$${match}`
      )
    );
    this.query = this.query.find(queryObj);
    return this;
  }
  sort(){
    if(this.queryString.sort){
        const sortBy:string = this.queryString.sort.split(',').join(' ')
        this.query = this.query.sort(sortBy)
    }else{
        this.query = this.query.sort('-createdAt')
    }
    return this
  }
  limitFields(){
    if(this.queryString.fields){
        const fields = this.queryString.fields.split(',').join(' ');
        this.query = this.query.select(fields);
    }else{
        this.query = this.query.select('-__v');
    }
    return this
  }
  pagination(){
    const page = this.queryString.page || process.env.PAGE;
    const limit = this.queryString.limit || process.env.LIMIT;
    const skip = (page-1)*limit
    this.query = this.query.skip(skip).limit(limit);
    return this
  }
}
