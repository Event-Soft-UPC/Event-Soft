
export default class Publisher {
    Id: string;
    Name: string;
    DNI: string;
    Email: string;
    Password: string;

    public constructor(Id: string, Name: string, DNI: string, Email: string, Password: string) {
        this.Id = Id;
        this.Name = Name;
        this.DNI = DNI;
        this.Email = Email;
        this.Password = Password;
    }

}

