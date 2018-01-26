'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var RotaSchema = new Schema({
  Numero: {
    type: String,
    required: 'Entre com o Numero da Load'
  },
  DataRecebimento: {
    type: Date,
    default: Date.now
  },
  DataInicio: {
    type: Date,
    default: null
  },
  DataTermino: {
    type: Date,
    default: null
  },
  Status: {
    type: [{
      type: String,
      enum: ['Recebido', 'Em Execucao', 'Finalizado']
    }],
    default: ['Recebido']  
  }
});

module.exports = mongoose.model('Rota', RotaSchema);