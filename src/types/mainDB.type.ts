import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  id: string;
  firstname: string;
  email: string;
  lastname: string;
  avatar?: string;
  phone?: string;
  birthDate?: Date;
  bio?: string;
  address?: string;
  password: string;
  role?: string;
  isConected?: boolean;
  preferences?: {
    theme: string;
    language: string;
    notifications: boolean;
  };
  eventInterest?: string[];
  createdAt?: Date;
}

//   song
export interface ISong extends mongoose.Document {
  id: string;
  title: string;
  artist?: string;
  album?: string;
  songLink?: string;
  year: number;
  imgSong?: string;
  createdAt?: Date;
}

export interface IAlbum extends mongoose.Document {
  title: string;
  subtitle?: string;
  artist: string;
  year: number;
  imgAlbum?: string;
  songs?: ISong[];
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
  time: string;
  createdAt?: Date;
}

export interface IticketEvent extends mongoose.Document {
  id: string;
  event: string;
  user: string;
  price: number;
  createdAt?: Date;
}

// streamings
export interface IStreaming extends mongoose.Document {
  id: string;
  title: string;
  thumbnail: string;
  videoLink: string;
  description?: string;
  date?: Date;
  createdAt?: Date;
}

export interface IfactureAlbum extends mongoose.Document {
  id: string;
  album: string;
  user: string;
  price: number;
  createdAt?: Date;
}

// chat entre 2 users
export interface IChat extends mongoose.Document {
  id: string;
  user1: string;
  user2: string;
  messages: IMessage[];
  createdAt?: Date;
}

// message dans un chat
export interface IMessage extends mongoose.Document {
  id: string;
  user: string;
  message: string;
  isRead: boolean;
  isTyping: boolean;
  createdAt?: Date;
}
