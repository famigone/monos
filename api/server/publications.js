import Pregunta from "/imports/api/pregunta.js";
import Contacto from "/imports/api/contacto.js";
import Respuesta from "/imports/api/respuesta.js";
import ContactoPregunta from "/imports/api/contactoPregunta.js";
import { Mongo } from "meteor/mongo";
import { ReactiveAggregate } from "meteor/tunguska:reactive-aggregate";

const MAX = 1000;

Meteor.publish("pregunta", function() {
  return Pregunta.find({ activo: true });
});

//Meteor.publish("analisis", function(codigo) {
//  var pipeline = [
//    { $match: { codigo: codigo } },
//    { $group: { _id: "$rtatexto", total: { $sum: 1 } } },
//    { $project: { total: "$rtatexto" } },
//    { $sort: { codigo: 1 } }
//  ];
//  ReactiveAggregate(this, Respuesta, pipeline, {
//    clientCollection: "clientRespuesta"
//  });
//});

Meteor.publish("contacto", function(
  limit,
  fechaDesde,
  fechaHasta,
  usuarioid,
  codigo
) {
  const options = {
    sort: { createdAt: -1 },
    limit: Math.min(limit, MAX)
  };
  const desde = new Date(fechaDesde);
  const hasta = new Date(fechaHasta);
  if (codigo === null || codigo === 0)
    return Contacto.find(
      {
        activo: true,
        createdBy: usuarioid,
        createdAt: {
          $gte: desde,
          $lte: hasta
        }
      },
      options
    );
  else
    return Contacto.find(
      {
        activo: true,
        createdBy: usuarioid,
        autonumerico: codigo
      },
      options
    );
});

Meteor.publish("contactopregunta", function(contactoid, contactopreguntaid) {
  //return ContactoPregunta.find();
  return ContactoPregunta.find({
    contactoid: contactoid,
    contactopreguntaid: contactopreguntaid
  });
});

Meteor.publish("contactoOne", function(id) {
  //return ContactoPregunta.find();
  return Contacto.find({ _id: id });
});

Meteor.publish("contactopreguntatodes", function(contactoid) {
  //return ContactoPregunta.find();
  return ContactoPregunta.find(
    {
      contactoid: contactoid
    },
    { sort: { orden: 1 } }
  );
});

Meteor.publish("respuesta", function(contactoid, codigo) {
  //return ContactoPregunta.find();
  return Respuesta.find({
    contactoid: contactoid,
    codigo: codigo,
    activo: true
  });
});

Meteor.publish("respuestacount", function(codigo, opcion) {
  //return ContactoPregunta.find();
  return Respuesta.find({
    rtatexto: opcion,
    codigo: codigo,
    activo: true
  });
});

Meteor.publish("respuestaOne", function(id) {
  //return ContactoPregunta.find();
  return Respuesta.find({ contactoid: id, activo: true });
});

Meteor.publish("contactopregunta", function(id) {
  //return ContactoPregunta.find();
  return ContactoPregunta.find({ contactoid: id });
});

Meteor.publish("users", function() {
  //return ContactoPregunta.find();
  return Meteor.users.find();
});
