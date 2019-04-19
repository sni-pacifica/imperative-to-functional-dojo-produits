class Client {
  constructor(
    readonly nom: string,
    readonly age: number
  ) { }
}

class Contrat {
  constructor(
    readonly numero: string,
    readonly client: Client
  ) { }
}

class Formule { 
  constructor(
    readonly nom: string,
    readonly options: Array<OptionContrat>
  ) { }  
}

class OptionContrat { 
  constructor(
    readonly nom: string
  ) { }  
}
