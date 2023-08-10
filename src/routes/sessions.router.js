import { Router } from 'express';
import passport from 'passport';
import { failLogin, login, loginAdmin, logout, passportFailRegister, passportGithub , passportRegister } from '../controllers/sessions.controller.js';

const router = Router();

router.get('/github', passport.authenticate('github', {scope: [`user : email`]}), async (req, res) => {})
router.get('/githubcallback', passport.authenticate('github', { failureRedirect: 'api/sessions/login' }), passportGithub);
router.post('/register', passport.authenticate('register',{failureRedirect: 'failregister'}), passportRegister)
router.get('/failregister', passportFailRegister)
router.post('/loginAdmin', loginAdmin)
router.post('/login', passport.authenticate('login',{failureRedirect: 'faillogin'}), login)
router.get('/faillogin', failLogin)
router.get('/logout', logout)
router.get('/github', passport.authenticate('github', {scope: [`user : email`]}))

export default router;