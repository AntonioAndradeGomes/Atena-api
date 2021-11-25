
class CreateAccessCodeSerivce {

  async execute(expiredAt : string) {
    const code = this.genereteCode();
    return {access: code, expiredAt : expiredAt};
  }

  private genereteCode() {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJLMNOPQRSTUVWXYZ";
    let code = "";
    for (let i = 0; i < 7; i++) {
      let randomNumber = Math.floor(Math.random() * chars.length);
      code += chars.substring(randomNumber, randomNumber + 1);
    }
    return code;
  }
}

export { CreateAccessCodeSerivce }
