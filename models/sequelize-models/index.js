const db = require('./database');
const Sequelize = require('sequelize');

// Make sure you have `postgres` running!

//---------VVVV---------  your code below  ---------VVV----------

const Task = db.define('Task', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  due: Sequelize.DATE,
});

const Owner = db.define('Owner', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

Task.belongsTo(Owner);
Owner.hasMany(Task);

Task.clearCompleted = async () => {
  await Task.destroy({
    where: {
      complete: true,
    },
  });
};

Task.completeAll = async () => {
  await Task.update(
    { complete: true },
    {
      where: {
        complete: false,
      },
    }
  );
};

Task.prototype.getTimeRemaining = function () {
  console.log();
  if (!this.due) {
    return Infinity;
  } else {
    let now = new Date().getTime();
    let due = this.due.getTime();

    return due - now;
  }
};

Task.prototype.isOverdue = function () {
  let now = new Date();
  if (this.complete) {
    return false;
  } else if (now > this.due) {
    return true;
  }
  return false;
  //spent way too much time on this one having defined the function with arrow keys
  //and forgetting how it affected the context of "this" :/
};

Task.prototype.assignOwner = async function (owner) {
  console.log(Object.keys(this.__proto__));

  return await this.setOwner(owner);
};

Owner.getOwnerAndTasks = function () {
  //Struggled here :/
};

Owner.getIncompleteTasks = function () {
  //Struggled here too :/
};

Owner.addHook('beforeDestroy', (ownerInstance) => {
  if (ownerInstance.name === 'Grace Hopper') {
    throw 'Grace Hopper is a protected owner!';
  }
});

//---------^^^---------  your code above  ---------^^^----------

module.exports = {
  Task,
  Owner,
};
