
var expect = require('chai').expect;
var getCategory = require('../../../midleware/caegory/getCategory');
const getCategorysMW = require('../../midelware/category/getCategorysMW');

describe('delCategory midleware ', function () {
    it('should return categories', function(done){
        const mw = getCategorysMW({
            CatergoryModel: {
                findOne: (p1,cb) => {
                    expect(p1).to.be.eql({ _id: 1 })
                    cb(null, 'mockbefott');
                }
            }
        });

 
    const resMock ={locals:{}};
    mw(
        {
            params: {
                categoryid: '1'
            }
        },
        resMock,
        (err) =>{
            expect(err).to.be.eql(undefined);
            expect(resMock.locals).to.be.eql({_id: '1'});
            done();
        }


    )
});


it('should call db error in categories', function(done){
    const mw = getCategorysMW({
        CatergoryModel: {
            findOne: (p1,cb) => {
                expect(p1).to.be.eql({ _id: 1 })
                cb("hiba", null);
            }
        }
    });


const resMock ={locals:{}};
mw(
    {
        params: {
            categoryid: '1'
        }
    },
    resMock,
    () =>{
        expect(resMock.locals).to.be.eql({_id: '1'});
        done();
    }


)
});

});
