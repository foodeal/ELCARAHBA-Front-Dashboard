export const PublicitesTable = (props) => {
    return (
        <Card>
            <Box sx={{ minWidth: 800 }}>
            <Scrollbar>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedAll}
                        indeterminate={selectedSome}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectAll?.();
                          } else {
                            onDeselectAll?.();
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
    
                    </TableCell>
                    <TableCell>
                      Avatar
                    </TableCell>
                    <TableCell>
                      Titre
                    </TableCell>
                    <TableCell>
                      Client
                    </TableCell>
                    <TableCell>
                      Prix
                    </TableCell>
                    <TableCell>
                      Durée
                    </TableCell>
                    <TableCell>
                      Description
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  
                  {paginatedPubs.map((publicite) => {
                  
                    return (
                      <TableRow
                        hover
                        key={publicite.id}
                        selected={publicite.id === selectedItemId}
                      >
                        <TableCell>
                          <div>
                            <IconButton onClick={() => handleDeleteIconClick(user)} aria-label="delete" color="primary">
                              <DeleteIcon color="error" />
                            </IconButton>
                            <Dialog open={isDialogOpen} onClose={handleDialogClose} slotProps={{backdrop: { style: { backgroundColor: "rgba(0, 0, 0, 0.15)", },},}}>
                              <DialogTitle>Confirmation</DialogTitle>
                              <DialogContent>Êtes-vous sûr de vouloir supprimer la publicité ?</DialogContent>
                              <DialogActions>
                                <Button onClick={handleDialogClose}>Annuler</Button>
                                <Button onClick={() => handleConfirmDelete(publicite.id)} color="error">Supprimer</Button>
                              </DialogActions>
                            </Dialog>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                          <IconButton onClick={() => setIsEditDialogOpen(true)} aria-label="edit" color="primary" 
                      variant="contained"> 
                    <EditIcon />
                        </IconButton>
                            <Dialog open = {isEditDialogOpen} onClose = {handleDialogClose} slotProps={{backdrop: { style: { backgroundColor: "rgba(0, 0, 0, 0.15)", },},}}>
                            <DialogTitle>Modifications de la publicité : </DialogTitle>
                            <DialogContent>
                            <form onSubmit={(event) => submitForm(event, publicite.id)}>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    helperText="Entrer le titre de la publicité"
                                    label="Titre"
                                    name="titre"
                                    onChange={(event) => setTitre(event.target.value)}
                                    required
                                     value={publicite.titre_pub} />
                            </Grid>
                            <Grid
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    label="Client"
                                    name="client"
                                    onChange={(event) => setDClient(event.target.value)}
                                    required
                                    value={publicite.client_pub} />
                            </Grid>
                            <Grid
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    label="Prix"
                                    name="prix_pub"
                                    onChange={(event) => setPrix(event.target.value)}
                                    required
                                    value={publicite.prix_pub} />
                            </Grid>
                            <Grid
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    label="Durée"
                                    name="duree_pub"
                                    onChange={(event) => setDuree(event.target.value)}
                                    type="number"
                                    required
                                    value={publicite.duree_pub} />
                            </Grid>
                            <Grid
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    label="Description"
                                    name="description_pub"
                                    onChange={(event) => setDescription(event.target.value)}
                                    required
                                    value={publicite.description_pub} />
                            </Grid>
                            </Grid>
                    <Divider />
                    </form>
                    </DialogContent>
                    <DialogActions>
                                <Button onClick={handleDialogClose}>Annuler</Button>
                                <Button  variant="contained" color="primary" type="submit" >Enregistrer </Button>
    
                              </DialogActions>
                         </Dialog>
                          </div>
                          </TableCell>
    
                        <TableCell>
                        </TableCell>
                        <TableCell>
                          <Link href={`/publicites/${publicite.id}`}>
                            {publicite.titre_pub} 
                          </Link>
                        </TableCell>
                        <TableCell>
                          {publicite.client_pub}
                        </TableCell>
                        <TableCell>
                          {publicite.prix_pub}
                        </TableCell>
                        <TableCell>
                          {publicite.duree_pub}
                        </TableCell>
                        <TableCell>
                          {publicite.description_pub}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
                </Table>
          </Scrollbar>
                <TablePagination
            component="div"
            count={count}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
            </Box>
        </Card>
      );
}