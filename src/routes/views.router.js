import { Router } from "express";

const router = Router();

router.get('/chat', (req , res) => {
    res.render('chat',{title: 'chat', style:'styles.css'} )
})

export default router;

