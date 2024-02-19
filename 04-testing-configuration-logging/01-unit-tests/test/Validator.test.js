const Validator = require('../Validator');
const expect = require('chai').expect;

describe('testing-configuration-logging/unit-tests', () => {
  describe('Validator', () => {
    it('валидатор проверяет строковые поля', () => {
      const validator = new Validator({
        name: {
          type: 'string',
          min: 10,
          max: 20,
        },
      });

      const error1 = validator.validate({ name: 'Lalala' });

      expect(error1).to.have.length(1);
      expect(error1[0]).to.have.property('field').and.to.be.equal('name');
      expect(error1[0]).to.have.property('error').and.to.be.equal(`too short, expect 10, got 6`);

      const error2 = validator.validate({ name: 10 })

      expect(error2).to.have.length(1);
      expect(error2[0]).to.have.property('field').and.to.be.equal('name');
      expect(error2[0]).to.have.property('error').and.to.be.equal('expect string, got number');

      const error3 = validator.validate({ name: 'Lalalalalalalalalalala' });

      expect(error3).to.have.length(1);
      expect(error3[0]).to.have.property('field').and.to.be.equal('name');
      expect(error3[0]).to.have.property('error').and.to.be.equal(`too long, expect 20, got 22`);
    });

    it('валидатор проверяет числовые поля', () => {
      const validator = new Validator({
        age: {
          type: 'number',
          min: 10,
          max: 20,
        },
      });

      const error1 = validator.validate({ age: 9 });

      expect(error1).to.have.length(1);
      expect(error1[0]).to.have.property('field').and.to.be.equal('age');
      expect(error1[0]).to.have.property('error').and.to.be.equal('too little, expect 10, got 9');

      const error2 = validator.validate({ age: 21 });

      expect(error2).to.have.length(1);
      expect(error2[0]).to.have.property('field').and.to.be.equal('age');
      expect(error2[0]).to.have.property('error').and.to.be.equal('too big, expect 20, got 21');

      const error3 = validator.validate({ age: '1' });

      expect(error3).to.have.length(1);
      expect(error3[0]).to.have.property('field').and.to.be.equal('age');
      expect(error3[0]).to.have.property('error').and.to.be.equal('expect number, got string');

    })

    it('валидатор проверяет оба поля', () => {
      const validator = new Validator({
        name : {
          type: 'string',
          min: 5,
          max: 8,
        },
        age: {
          type: 'number',
          min: 10,
          max: 20,
        },
      });

      const error1 = validator.validate({ name: 'samanta', age: '11' });

      expect(error1).to.have.length(1);
      expect(error1[0]).to.have.property('field').and.to.be.equal('age');
      expect(error1[0]).to.have.property('error').and.to.be.equal('expect number, got string')

      const error2 = validator.validate({ name: 1, age: '11' });

      expect(error2).to.have.length(1);
      expect(error2[0]).to.have.property('field').and.to.be.equal('name');
      expect(error2[0]).to.have.property('error').and.to.be.equal('expect string, got number');

      const error3 = validator.validate({ name: 'a', age: 1 });

      expect(error3).to.have.length(2);
      expect(error3[0]).to.have.property('field').and.to.be.equal('name');
      expect(error3[0]).to.have.property('error').and.to.be.equal('too short, expect 5, got 1');
      expect(error3[1]).to.have.property('field').and.to.be.equal('age');
      expect(error3[1]).to.have.property('error').and.to.be.equal('too little, expect 10, got 1');

    })

  });
});