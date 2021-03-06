function Resource(value, type){
    this.level = value;
    this.type = type;
    this.withdraw = function(amount){
        let drain = 0;
        if (amount > this.level){
            drain = this.level;
            this.level = 0;
            return drain;
        }
        drain = amount;
        this.level -= drain;
        return drain;
    }
};

function ResourceDeposit(value, capacity, type){
    Resource.call(this, value, type);
    this.capacity = capacity;
    this.isFull = function(){
        return this.capacity === this.level;
    }
    this.deposit = function(amount){
        if (amount+this.level > this.capacity){
            this.level = this.capacity;
        } else {
            this.level += amount;
        }
    }
    this.increaseCapacity = function(amount){
        this.capacity += amount;
    }
};

function PowerGrid(){
    this.incomes = [];
    this.demands =  [];

    this.getBalance = function(){
        let balance = 0;
        this.incomes.forEach(element => {
            balance += element.source.powerOutput;
        });
        this.demands.forEach(element => {
            balance -= element.value;
        })
        return balance;
    }

    this.addIncome = function(income){
        this.incomes.push(income);
    }

    this.addDemand = function(demand){
        this.demands.push(demand);
    }
}

var areas = [[new Resource(5000, "Scrap"), new Resource(10000, "Raw Biomass")], []];

var internal = {minerals: new ResourceDeposit(0,5000, "Minerals"), biomatter: new ResourceDeposit(0,5000, "Biomatter"), power: new PowerGrid()}