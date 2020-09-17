const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const config = require('./config/key')
const bodyParser = require('body-parser')
const { User } = require('./models/User')

// application/x-www-form-urlencoded 이렇게 된 데이터를 분석해서 가져올 수 있게 한다.
app.use(bodyParser.urlencoded({ extended: true }))

// application/json 데이터를 분석해서 가져올 수 있게 한다.
app.use(bodyParser.json())

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send("<div style='display: flex; justify-content: center; align-items: center; width: 100%; height: 100vh;'><h1>Hello World JMC!</h1><h1></h1></div>")
})

app.post('/api/user/register/', (req, res) => {
    // 1) 회원가입할 때 필요한 정보들을 client에서 가져와야 한다.
    // 2) 가져온 정보를 User 모델에 저장해야 한다.

    // 회원정보를 인자로 넣어서 유저 모델의 인스턴스를 만든다.
    const user = new User(req.body)

    // 인스턴스(mongoose document)를 저장한다.
    user.save((err, userInfo) => {
        // 저장 실패하면 에러메시지 출력
        if (err) return res.json({ success: false, err })
        // 저장 성공하면 성공메시지와 유저정보 출력
        return res.status(200).json({
            success: true,
            userInfo
        })
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})