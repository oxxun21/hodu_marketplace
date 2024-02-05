export interface SignIn_I {
  username: string;
  password: string;
  login_type: "BUYER" | "SELLER";
}

export interface SignUpBuyer_I {
  username: string;
  password: string;
  password2: string;
  phone_number: string;
  name: string;
}

export interface SignUpSeller_I {
  username: string;
  password: string;
  password2: string;
  phone_number: string;
  name: string;
  company_registration_number: string;
  store_name: string;
}
