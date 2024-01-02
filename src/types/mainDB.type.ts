import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    id: string;
    firstname: string;
    email: string;
    lastname: string;
    imgProfile?: string;
    phone?: string;
    birthDate?: Date;
    bio?: string;
    address?: string;
    password: string;
    role?: string;
    preferences?: {
      theme: string;
      language: string;
      notifications: boolean;
    };
    eventInterest?: string[];
    createdAt?: Date;
  }

  export interface IAlbum extends mongoose.Document {
    name: string;
    artist: string;
    year: number;
    imgAlbum?: string;
    genre?: string;
    songs?: string[];
    usersBuy?: string[];
    createdAt?: Date;
}

export interface IEvent extends mongoose.Document {
    id: string;
    title: string;
    img: string;
    description: string;
    location: string;
    tickets?: string[];
    date: Date;
    time : string;
    createdAt?: Date;
}

export interface IticketEvent extends mongoose.Document {
    id: string;
    event: string;
    user: string;
    price: number;
    createdAt?: Date;
}

export interface IfactureAlbum extends mongoose.Document {
    id: string;
    album: string;
    user: string;
    price: number;
    createdAt?: Date;
}

export interface IfactureEvent extends mongoose.Document {
    id: string;
    event: string;
    user: string;
    price: number;
    createdAt?: Date;
}

// chat
export interface IChat extends mongoose.Document {
    id: string;
    user: string;
    message: string;
    createdAt?: Date;
}

export interface IChatRoom extends mongoose.Document {
    id: string;
    name: string;
    users: string[];
    createdAt?: Date;
}

