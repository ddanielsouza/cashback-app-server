export default interface IAuthProvider {
   authenticate(userId: string): Promise<string>;
}
