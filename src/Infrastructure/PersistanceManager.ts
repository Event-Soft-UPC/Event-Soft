export default interface PersistanteManager{
   connect(connectionString:string):Promise<void>
}