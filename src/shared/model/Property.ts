import { makeAutoObservable } from "mobx";
import AppStore from "../store/AppStore";

export const defaultProperty: IProperty = {
    type: 'rent',
    title: '',
    description: '',
    address: '',
    bedrooms: 1,
    bathrooms: 1,
    carspace: 0,
    listingSize: 0,
    regularPrice: 0,
    images: [],
    likes: 0,

    id: "",
    uid: "",
    postedOn: Date.now(),
};

export interface IProperty {
    id: string,
    uid: string,
    postedOn: number,

    type: 'sale' | "rent",
    title: string,
    description: string,
    address: string,
    bedrooms: number,
    bathrooms: number,
    carspace: number,
    listingSize: number,
    regularPrice: number,
    images: string[],
    likes: number
}

export class Property {
    id: string;
    uid: string;
    postedOn: number;
    type: 'sale' | "rent";
    title: string;
    description: string;
    address: string;
    bedrooms: number;
    bathrooms: number;
    carspace: number;
    listingSize: number;
    regularPrice: number;
    images: string[];
    likes: number;
    constructor(private store: AppStore, item: IProperty) {
        makeAutoObservable(this);
        this.id = item.id
        this.uid = item.uid
        this.postedOn = item.postedOn
        this.type = item.type
        this.title = item.title
        this.description = item.description
        this.address = item.address
        this.bedrooms = item.bedrooms
        this.bathrooms = item.bathrooms
        this.carspace = item.carspace
        this.listingSize = item.listingSize
        this.regularPrice = item.regularPrice
        this.images = item.images
        this.likes = item.likes
    }
}