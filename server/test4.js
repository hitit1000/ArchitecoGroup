const price_info =
[
        {
        id: 1,
        item: '',
        link: 0,
        household: '0_or_more',
        '3_to_5': '0'
    },
        {
        id: 16,
        item: '녹색건축인증 예비인증',
        link: 3,
        household: '100_or_less',
        '3_to_5': '750'
    },
        {
        id: 17,
        item: '녹색건축인증 예비인증',
        link: 3,
        household: '101_to_300',
        '3_to_5': '850'
    },
        {
        id: 18,
        item: '녹색건축인증 예비인증',
        link: 3,
        household: '301_to_500',
        '3_to_5': '950'
    },
        {
        id: 19,
        item: '녹색건축인증 예비인증',
        link: 3,
        household: '501_to_1000',
        '3_to_5': '1050'
    },
        {
        id: 20,
        item: '녹색건축인증 예비인증',
        link: 3,
        household: '1001_to_1500',
        '3_to_5': '1200'
    },
        {
        id: 21,
        item: '녹색건축인증 예비인증',
        link: 3,
        household: '1501_to_2000',
        '3_to_5': '1300'
    },
        {
        id: 22,
        item: '녹색건축인증 예비인증',
        link: 3,
        household: '2001_or_more',
        '3_to_5': '1400'
    },
        {
        id: 23,
        item: '녹색건축인증 본인증',
        link: 4,
        household: '100_or_less',
        '3_to_5': '900'
    },
        {
        id: 24,
        item: '녹색건축인증 본인증',
        link: 4,
        household: '101_to_300',
        '3_to_5': '1000'
    },
        {
        id: 25,
        item: '녹색건축인증 본인증',
        link: 4,
        household: '301_to_500',
        '3_to_5': '1100'
    },
        {
        id: 26,
        item: '녹색건축인증 본인증',
        link: 4,
        household: '501_to_1000',
        '3_to_5': '1200'
    },
        {
        id: 27,
        item: '녹색건축인증 본인증',
        link: 4,
        household: '1001_to_1500',
        '3_to_5': '1350'
    },
        {
        id: 28,
        item: '녹색건축인증 본인증',
        link: 4,
        household: '1501_to_2000',
        '3_to_5': '1450'
    },
        {
        id: 29,
        item: '녹색건축인증 본인증',
        link: 4,
        household: '2001_or_more',
        '3_to_5': '1550'
    },
        {
        id: 30,
        item: '건축물에너지효율등급인증 예비인증',
        link: 5,
        household: '100_or_less',
        '3_to_5': '300'
    },
        {
        id: 31,
        item: '건축물에너지효율등급인증 예비인증',
        link: 5,
        household: '101_to_300',
        '3_to_5': '400'
    },
        {
        id: 32,
        item: '건축물에너지효율등급인증 예비인증',
        link: 5,
        household: '301_to_500',
        '3_to_5': '500'
    },
        {
        id: 33,
        item: '건축물에너지효율등급인증 예비인증',
        link: 5,
        household: '501_to_1000',
        '3_to_5': '600'
    },
        {
        id: 34,
        item: '건축물에너지효율등급인증 예비인증',
        link: 5,
        household: '1001_to_1500',
        '3_to_5': '800'
    },
        {
        id: 35,
        item: '건축물에너지효율등급인증 예비인증',
        link: 5,
        household: '1501_to_2000',
        '3_to_5': '900'
    },
        {
        id: 36,
        item: '건축물에너지효율등급인증 예비인증',
        link: 5,
        household: '2001_or_more',
        '3_to_5': '1000'
    },
        {
        id: 37,
        item: '건축물에너지효율등급인증 본인증',
        link: 6,
        household: '100_or_less',
        '3_to_5': '450'
    },
        {
        id: 38,
        item: '건축물에너지효율등급인증 본인증',
        link: 6,
        household: '101_to_300',
        '3_to_5': '550'
    },
        {
        id: 39,
        item: '건축물에너지효율등급인증 본인증',
        link: 6,
        household: '301_to_500',
        '3_to_5': '650'
    },
        {
        id: 40,
        item: '건축물에너지효율등급인증 본인증',
        link: 6,
        household: '501_to_1000',
        '3_to_5': '750'
    },
        {
        id: 41,
        item: '건축물에너지효율등급인증 본인증',
        link: 6,
        household: '1001_to_1500',
        '3_to_5': '950'
    },
        {
        id: 42,
        item: '건축물에너지효율등급인증 본인증',
        link: 6,
        household: '1501_to_2000',
        '3_to_5': '1050'
    },
        {
        id: 43,
        item: '건축물에너지효율등급인증 본인증',
        link: 6,
        household: '2001_or_more',
        '3_to_5': '1150'
    }
]

let house_data = 999;
let filter_price = price_info.filter(
    v => {
    if(
        house_data <= Number(v.household.replace(`_or_less`,"")) 
        || (house_data >= Number(v.household.replace(`_or_more`,""))) 
        || (Number(v.household.split('_to_')[0])<=house_data && house_data<=Number(v.household.split('_to_')[1]))
        ){
            return delete v.household
        }
    }
    // v => 
    //     house_data <= Number(v.household.replace(`_or_less`,"")) 
    //     || (house_data >= Number(v.household.replace(`_or_more`,""))) 
    //     || (Number(v.household.split('_to_')[0])<=house_data && house_data<=Number(v.household.split('_to_')[1])) 
    
)


console.log(filter_price)