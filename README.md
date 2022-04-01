# Minhas Funcionaldades

## Vector
 A classe Vector é uma abstração do vetor que nos usamos na fisíca
 e matemática, comtendo métodos que nos permite manipulá-lo livremente.
### Como usar
#### **começando**
      let vector = new Vector(x?, y?);
      ou      
      let vector = Vector.create(x?, y?);
#### **Manipulando Vetores**
      let vector = Vector.create(100, 200);
      let otherVector = Vector.create(1, 5);
      vector.add(otherVector);
      
      let staticVector = Vector.sub(vector, otherVector); // retorna um novo vetor igual vector.sub(otherVector)
      
      const toRadian = (angle) => {return (angle * Math.PI) / 180};
      let angleVector = Vector.createVectorByAngle(toRadian(45)); // cria um vetor unitario com angulação de 45 graus
      angleVector.setMag(5); // almenta o modulo do vetor preservando sua direção
#### **Aplicando leis de newton**
      class car {
         costructor(x = 200, y = 200, mass = 10) {
            this.pos = Vector.create(x, y); // a posição inicial do carro
            this.acc = Vector.create(); // a aceleração do carro
            this.vel = Vector.create(); // a velocidade do carro
         }
         
         firstLaw() {
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.set(0, 0); // limpa o vetor da aceleração 
         }
         
         secondLaw(vectorForce) {
            // fórmula da segunda lei F = a.m 
            // ou a = F/m
            this.acc.add(vectorForce).div(this.mass);
         }
### O porquê de uasr?
 - Classe modulada ou seja possível usar import
 - Comtem métodos estaticos de criação padrão factory
 - Comtem encadeamento de métodos padrão method chainig
 - quando um método é usado altera o próprio objeto
 - metodos estaticos retornam um novo objeto
## Autor
   - Fabricio Borges Justino
