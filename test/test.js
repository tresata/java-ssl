var chai = require('chai'),
	expect = chai.expect,
	Keystore = require('../index');

chai.should();


describe('Keystore', function(){

	var certAlias = "awsldap.tresata.com",
		keyAlias = "tresata_selfsigned"
		store = "test/tresata_keystore",
		storepass = "tresata"

	it('should throw error if keystore param is not passed', function(){
		expect(function(){
			Keystore('',storepass);
		}).to.throw();
	});

	it('should throw error if storepass param is not passed', function(){
		expect(function(){
			Keystore(store, '');
		}).to.throw();
	});

	it('should return a valid object when provided with keystore and storepass params', function(){
		var _ks = Keystore(store, storepass);
		_ks.should.be.an('object');
		_ks.should.have.a.property('getCert').that.is.a('function');
		_ks.should.have.a.property('getPrivateKey').that.is.a('function');
	});


	describe('getCert', function(){

		it('shold throw an exception if alias param is not passed', function(){
			var _ks = Keystore(store, storepass);
			expect(function(){
				_ks.getCert('');
			}).to.throw();
		});

		it('shold throw an exception if alias does not exist in keystore', function(){
			var _ks = Keystore(store, storepass);

			expect(function(){
				_ks.getCert('nonExistingAlias');
			}).to.throw();

		});

		it('should throw an exception if keystore path is not valid', function(){
			var _ks = Keystore('nonExistingPath', storepass);

			expect(function(){
				_ks.getCert(certAlias);
			}).to.throw();

		});

		it('shold throw an exception if storepass is not valid', function(){
			var _ks = Keystore(store, 'wrongPassword');

			expect(function(){
				_ks.getCert(certAlias);
			}).to.throw();
		});

		it('shold return valid private key when keystore, storepass and alias are valid', function(){
			var _ks = Keystore(store, storepass);
			_ks.getCert(certAlias).should.be.a('string');
		});

	});


	describe('getPrivateKey', function(){

		it('shold throw an exception if alias param is not passed', function(){
			var _ks = Keystore(store, storepass);
			expect(function(){
				_ks.getPrivateKey('');
			}).to.throw();
		});

		it('shold throw an exception if alias does not exist in keystore', function(){
			var _ks = Keystore(store, storepass);

			expect(function(){
				_ks.getPrivateKey('nonExistingAlias');
			}).to.throw();

		});

		it('should throw an exception if keystore path is not valid', function(){
			var _ks = Keystore('nonExistingPath', storepass);
			expect(function(){
				_ks.getPrivateKey(keyAlias);
			}).to.throw();

		});

		it('shold throw an exception if storepass is not valid', function(){
			var _ks = Keystore(store, 'wrongPassword');
			expect(function(){
				_ks.getPrivateKey(keyAlias);
			}).to.throw();
		});

		it('shold return valid private key when keystore, storepass and alias are valid', function(){
			var _ks = Keystore(store, storepass);
			_ks.getPrivateKey(keyAlias).should.be.a('string');
		});
		
	});
});