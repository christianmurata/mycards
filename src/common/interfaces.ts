export interface IField {
  name: String;
  value: String;
};

export interface ICard {
  name: String;
  description: String;
  type: String;
  price: Number;
  fields: [IField];
};