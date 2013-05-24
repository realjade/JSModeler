AddTest ('CoreTest', function (test) {
	var GetAValue = function (val)
	{
		return JSM.ValueOrDefault (val, 2);
	};

	var a = 0.0000001;
	var b = 0.0000002;
	var c = 0.000000001;
	var d = 0.000000002;
	
	var e = -0.0000001;
	var f = -0.0000002;
	var g = -0.000000001;
	var h = -0.000000002;
	
	test.Assert (!JSM.IsEqual (a, b));
	test.Assert (!JSM.IsEqual (a, e));

	test.Assert (JSM.IsEqual (c, d));
	test.Assert (JSM.IsEqual (c, g));
	
	test.Assert (JSM.IsPositive (a));
	test.Assert (!JSM.IsPositive (c));
	test.Assert (!JSM.IsPositive (d));

	test.Assert (JSM.IsNegative (e));
	test.Assert (!JSM.IsNegative (g));
	test.Assert (!JSM.IsNegative (h));

	test.Assert (JSM.IsLower (a, b));
	test.Assert (!JSM.IsLower (c, d));
	test.Assert (JSM.IsLowerOrEqual (c, d));

	test.Assert (JSM.IsGreater (b, a));
	test.Assert (!JSM.IsGreater (d, c));
	test.Assert (JSM.IsGreaterOrEqual (d, c));

	test.Assert (JSM.IsEqual (90.0 * JSM.DegRad, Math.PI / 2.0));
	test.Assert (JSM.IsEqual (Math.PI / 2.0 * JSM.RadDeg, 90.0));

	test.Assert (JSM.ValueOrDefault (1, 2) == 1);
	test.Assert (JSM.ValueOrDefault (undefined, 2) == 2);
	test.Assert (JSM.ValueOrDefault (null, 2) == 2);
	test.Assert (GetAValue (1) == 1);
	test.Assert (GetAValue (undefined) == 2);
	test.Assert (GetAValue (null) == 2);
	test.Assert (GetAValue () == 2);
});

AddTest ('VectorTest', function (test) {
	var coord2d1 = new JSM.Coord2D (1, 2);
	var coord2d2 = new JSM.Coord2D (3, 4);
	var coord2d3 = new JSM.Coord2D (1, 6);

	test.Assert (JSM.CoordIsEqual2D (coord2d1, new JSM.Coord2D (1, 2)));
	test.Assert (JSM.CoordIsEqual2D (JSM.MidCoord2D (coord2d1, coord2d2), new JSM.Coord2D (2, 3)));
	test.Assert (JSM.IsEqual (JSM.CoordDistance2D (coord2d1, coord2d2), 2.8284271247));
	test.Assert (JSM.CoordTurnType2D (coord2d1, coord2d2, coord2d3) == 'CounterClockwise');

	var coord1 = new JSM.Coord (1, 2, 3);
	var coord2 = new JSM.Coord (4, 5, 6);

	test.Assert (JSM.CoordIsEqual (coord1, new JSM.Coord (1, 2, 3)));
	test.Assert (JSM.CoordIsEqual (JSM.MidCoord (coord1, coord2), new JSM.Coord (2.5, 3.5, 4.5)));
	test.Assert (JSM.CoordIsEqual (JSM.VectorMultiply (coord1, 3), new JSM.Coord (3, 6, 9)));
	test.Assert (JSM.IsEqual (JSM.VectorDot (coord1, coord2), 32));
	test.Assert (JSM.CoordIsEqual (JSM.VectorCross (coord1, coord2), new JSM.Coord (-3, 6, -3)));
	test.Assert (JSM.IsEqual (JSM.VectorLength (coord1), 3.7416573867));
	test.Assert (JSM.CoordIsEqual (JSM.VectorNormalize (coord1), new JSM.Coord (0.2672612419, 0.5345224838, 0.8017837257)));
	test.Assert (JSM.IsEqual (JSM.VectorLength (JSM.VectorSetLength (coord1, 123)), 123));
	test.Assert (JSM.IsEqual (JSM.CoordDistance (coord1, coord2), 5.1961524227));
	test.Assert (JSM.CoordIsEqual (JSM.CoordAdd (coord1, coord2), new JSM.Coord (5, 7, 9)));
	test.Assert (JSM.CoordIsEqual (JSM.CoordSub (coord1, coord2), new JSM.Coord (-3, -3, -3)));
	test.Assert (JSM.CoordIsEqual (JSM.CoordOffset (coord2, coord1, 5.0), new JSM.Coord (5.3363062095, 7.672612419, 10.0089186285)));
	
	var coord = new JSM.Coord (1.0, 1.0, 1.0);
	var direction = new JSM.Vector (1.0, 0.0, 0.0);
	test.Assert (JSM.CoordIsEqual (JSM.CoordOffset (coord, direction, 1.0), new JSM.Coord (2.0, 1.0, 1.0)));
	
	var coord = new JSM.Coord (1.0, 1.0, 1.0);
	var axis = new JSM.Vector (0.0, 0.0, 1.0);
	var origo = new JSM.Vector (0.0, 0.0, 0.0);
	var angle = 90.0 * JSM.DegRad;
	test.Assert (JSM.CoordIsEqual (JSM.CoordRotate (coord, axis, angle, origo), new JSM.Coord (-1.0, 1.0, 1.0)));

	var vector1 = new JSM.Vector (1.0, 0.0, 0.0);
	var vector2 = new JSM.Vector (0.0, 1.0, 0.0);
	test.Assert (JSM.IsEqual (JSM.GetVectorsAngle (vector1, vector2), 90.0 * JSM.DegRad));

	var vector = new JSM.Vector (1.0, 0.0, 0.0);
	test.Assert (JSM.IsEqual (JSM.VectorLength (vector), 1.0));
	
	var vector = new JSM.Vector (1.0, 2.0, 3.0);
	var multiplied = JSM.VectorMultiply (vector, 2.0);
	test.Assert (JSM.CoordIsEqual (multiplied, new JSM.Coord (2.0, 4.0, 6.0)));
	
	var vector = new JSM.Vector (10.0, 0.0, 0.0);
	var normal = JSM.VectorNormalize (vector);
	test.Assert (JSM.CoordIsEqual (normal, new JSM.Coord (1.0, 0.0, 0.0)));
	
	var another = JSM.VectorSetLength (vector, 5.0);
	test.Assert (JSM.CoordIsEqual (another, new JSM.Coord (5.0, 0.0, 0.0)));

	var cartesian = JSM.SphericalToCartesian (1.0, 0.0, 90.0 * JSM.DegRad);
	test.Assert (JSM.CoordIsEqual (cartesian, new JSM.Coord (0.0, 0.0, 1.0)));

	var cartesian = JSM.CylindricalToCartesian (1.0, 1.0, 90.0 * JSM.DegRad);
	test.Assert (JSM.CoordIsEqual (cartesian, new JSM.Coord (0.0, 1.0, 1.0)));

	var coord = new JSM.Coord (1.0, 2.0, 3.0);
	var normal = new JSM.Coord (0.0, 1.0, 0.0);
	var origo = new JSM.Coord (0.0, 0.0, 0.0);
	var coord2D = JSM.GetCoord2DFromCoord (coord, origo, normal);
	test.Assert (JSM.CoordIsEqual2D (coord2D, new JSM.Coord (1.0, -3.0)));

	var coords = [
		new JSM.Coord (0.0, 0.0, 0.0),
		new JSM.Coord (1.0, 0.0, 0.0),
		new JSM.Coord (1.0, 1.0, 0.0),
		new JSM.Coord (0.0, 1.0, 0.0)
	];
	var normal = JSM.CalculateNormal (coords);
	test.Assert (JSM.CoordIsEqual (normal, new JSM.Coord (0.0, 0.0, 1.0)));
	var centroid = JSM.CalculateCentroid (coords);
	test.Assert (JSM.CoordIsEqual (centroid, new JSM.Coord (0.5, 0.5, 0.0)));
	
	var coords2 = [
		new JSM.Coord (0.0, 0.0, 0.0),
		new JSM.Coord (1.0, 0.0, 0.0),
		new JSM.Coord (1.0, 1.0, 0.0),
		new JSM.Coord (0.5, 0.5, 0.0),
		new JSM.Coord (0.0, 1.0, 0.0)
	];
	var normal2 = JSM.CalculateNormal (coords2);
	test.Assert (JSM.CoordIsEqual (normal2, new JSM.Coord (0.0, 0.0, 1.0)));
	var centroid2 = JSM.CalculateCentroid (coords2);
	test.Assert (JSM.CoordIsEqual (centroid2, new JSM.Coord (0.5, 0.5, 0.0)));

	var coords3 = [
		new JSM.Coord (0.0, 1.0, 0.0),
		new JSM.Coord (0.5, 0.5, 0.0),
		new JSM.Coord (0.5, 0.5, 0.0),
		new JSM.Coord (0.5, 0.5, 0.0),
		new JSM.Coord (0.0, 0.0, 0.0)
	];
	var normal3 = JSM.CalculateNormal (coords3);
	test.Assert (JSM.CoordIsEqual (normal3, new JSM.Coord (0.0, 0.0, -1.0)));
	var centroid3 = JSM.CalculateCentroid (coords3);
	test.Assert (JSM.CoordIsEqual (centroid3, new JSM.Coord (0.3, 0.5, 0.0)));

	var vector1 = new JSM.Vector (1.0, 0.0, 0.0);
	var vector2 = new JSM.Vector (0.0, 1.0, 0.0);
	test.Assert (JSM.IsEqual (JSM.GetVectorsAngle (vector1, vector2), Math.PI / 2.0));
	test.Assert (JSM.IsEqual (JSM.GetVectorsAngle (vector2, vector1), Math.PI / 2.0));

	var coord1 = new JSM.Vector (0.0, 0.0, 0.0);
	var coord2 = new JSM.Vector (1.0, 0.0, 0.0);
	var coord3 = new JSM.Vector (0.0, 1.0, 0.0);
	var normal1 = new JSM.Vector (0.0, 0.0, 1.0);
	var normal2 = new JSM.Vector (0.0, 0.0, -1.0);
	var normal3 = new JSM.Vector (0.0, -1.0, -1.0);

	test.Assert (JSM.CoordTurnType (coord1, coord2, coord3, normal1) == 'CounterClockwise');
	test.Assert (JSM.CoordTurnType (coord1, coord3, coord2, normal1) == 'Clockwise');
	test.Assert (JSM.CoordTurnType (coord1, coord3, coord3, normal1) == 'Collinear');

	test.Assert (JSM.CoordTurnType (coord1, coord2, coord3, normal2) == 'Clockwise');
	test.Assert (JSM.CoordTurnType (coord1, coord3, coord2, normal2) == 'CounterClockwise');
	test.Assert (JSM.CoordTurnType (coord1, coord3, coord3, normal2) == 'Collinear');

	test.Assert (JSM.CoordTurnType (coord1, coord2, coord3, normal3) == 'Clockwise');
	test.Assert (JSM.CoordTurnType (coord1, coord3, coord2, normal3) == 'CounterClockwise');
	test.Assert (JSM.CoordTurnType (coord1, coord3, coord3, normal3) == 'Collinear');

	var coord1 = new JSM.Vector (0.0, 0.0, 0.0);
	var coord2 = new JSM.Vector (1.0, 0.0, 0.0);
	var coord3 = new JSM.Vector (0.0, 0.0, 1.0);
	var normal1 = new JSM.Vector (0.0, 1.0, 0.0);
	var normal2 = new JSM.Vector (0.0, -1.0, 0.0);

	test.Assert (JSM.CoordTurnType (coord1, coord2, coord3, normal2) == 'CounterClockwise');
	test.Assert (JSM.CoordTurnType (coord1, coord3, coord2, normal2) == 'Clockwise');
	test.Assert (JSM.CoordTurnType (coord1, coord3, coord3, normal2) == 'Collinear');

	test.Assert (JSM.CoordTurnType (coord1, coord2, coord3, normal1) == 'Clockwise');
	test.Assert (JSM.CoordTurnType (coord1, coord3, coord2, normal1) == 'CounterClockwise');
	test.Assert (JSM.CoordTurnType (coord1, coord3, coord3, normal1) == 'Collinear');
	
	var coord1 = new JSM.Vector (0.0, 0.0, 0.0);
	var coord2 = new JSM.Vector (1.0, 0.0, 0.0);
	var coord3 = new JSM.Vector (-1.0, 0.0, 0.0);
	test.Assert (JSM.IsEqual (JSM.CoordSignedDistance (coord1, coord2, JSM.CoordSub (coord2, coord1)), 1.0));
	test.Assert (JSM.IsEqual (JSM.CoordSignedDistance (coord1, coord3, JSM.CoordSub (coord1, coord3)), -1.0));
});

AddTest ('CircleTest', function (test) {
	test.Assert (JSM.CoordIsEqual2D (JSM.PolarToCartesian (1.0, 0.0 * JSM.DegRad), new JSM.Coord2D (1.0, 0.0)));
	test.Assert (JSM.CoordIsEqual2D (JSM.PolarToCartesian (1.0, 90.0 * JSM.DegRad), new JSM.Coord2D (0.0, 1.0)));
	test.Assert (JSM.CoordIsEqual2D (JSM.PolarToCartesian (1.0, 180.0 * JSM.DegRad), new JSM.Coord2D (-1.0, 0.0)));
	test.Assert (JSM.CoordIsEqual2D (JSM.PolarToCartesian (1.0, 270.0 * JSM.DegRad), new JSM.Coord2D (0.0, -1.0)));
	test.Assert (JSM.CoordIsEqual2D (JSM.PolarToCartesian (1.0, 360.0 * JSM.DegRad), new JSM.Coord2D (1.0, 0.0)));
	test.Assert (JSM.CoordIsEqual2D (JSM.PolarToCartesian (1.0, 450.0 * JSM.DegRad), new JSM.Coord2D (0.0, 1.0)));
	
	var unitRadius = 2.0 * 1.0 * Math.PI;
	test.Assert (JSM.IsEqual (JSM.GetPolarArcLengthFromAngle (1.0, 0.0 * JSM.DegRad), 0.0));
	test.Assert (JSM.IsEqual (JSM.GetPolarArcLengthFromAngle (1.0, 90.0 * JSM.DegRad), unitRadius / 4.0));
	test.Assert (JSM.IsEqual (JSM.GetPolarArcLengthFromAngle (1.0, 180.0 * JSM.DegRad), unitRadius / 2.0));
	test.Assert (JSM.IsEqual (JSM.GetPolarArcLengthFromAngle (1.0, 270.0 * JSM.DegRad), 3.0 * unitRadius / 4.0));
	test.Assert (JSM.IsEqual (JSM.GetPolarArcLengthFromAngle (1.0, 360.0 * JSM.DegRad), unitRadius));
	test.Assert (JSM.IsEqual (JSM.GetPolarArcLengthFromAngle (1.0, 450.0 * JSM.DegRad), 5.0 * unitRadius / 4.0));
	
	test.Assert (JSM.IsEqual (JSM.GetPolarAngleFromArcLength (1.0, 0.0), 0.0 * JSM.DegRad));
	test.Assert (JSM.IsEqual (JSM.GetPolarAngleFromArcLength (1.0, unitRadius / 4.0), 90.0 * JSM.DegRad));
	test.Assert (JSM.IsEqual (JSM.GetPolarAngleFromArcLength (1.0, unitRadius / 2.0), 180.0 * JSM.DegRad));
	test.Assert (JSM.IsEqual (JSM.GetPolarAngleFromArcLength (1.0, 3.0 * unitRadius / 4.0), 270.0 * JSM.DegRad));
	test.Assert (JSM.IsEqual (JSM.GetPolarAngleFromArcLength (1.0, unitRadius), 360.0 * JSM.DegRad));
	test.Assert (JSM.IsEqual (JSM.GetPolarAngleFromArcLength (1.0, 5.0 * unitRadius / 4.0), 450.0 * JSM.DegRad));
});

AddTest ('MatrixTest', function (test) {
	var vector1 = [1, 2, 3, 4];
	var matrix1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
	var matrix2 = [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];
	
	var vector2 = JSM.VectorMatrixMultiply4x4 (vector1, matrix1);
	var matrix3 = JSM.MatrixMultiply4x4 (matrix1, matrix2);
	
	test.Assert (vector2[0] == 90);
	test.Assert (vector2[1] == 100);
	test.Assert (vector2[2] == 110);
	test.Assert (vector2[3] == 120);

	test.Assert (matrix3[0] == 250);
	test.Assert (matrix3[1] == 260);
	test.Assert (matrix3[2] == 270);
	test.Assert (matrix3[3] == 280);
	test.Assert (matrix3[4] == 618);
	test.Assert (matrix3[5] == 644);
	test.Assert (matrix3[6] == 670);
	test.Assert (matrix3[7] == 696);
	test.Assert (matrix3[8] == 986);
	test.Assert (matrix3[9] == 1028);
	test.Assert (matrix3[10] == 1070);
	test.Assert (matrix3[11] == 1112);
	test.Assert (matrix3[12] == 1354);
	test.Assert (matrix3[13] == 1412);
	test.Assert (matrix3[14] == 1470);
	test.Assert (matrix3[15] == 1528);
});

AddTest ('ArcLengthTest', function (test) {
	var a1 = new JSM.Vector (0.0, 1.0, 0.0);
	var a2 = new JSM.Vector (0.0, -1.0, 0.0);
	var a3 = new JSM.Vector (-1.0, 0.0, 0.0);
	var a4 = new JSM.Vector (1.0, 1.0, 0.0);
	var a5 = new JSM.Vector (1.0, -1.0, 0.0);
	
	var b1 = new JSM.Vector (1.0, 0.0, 0.0);
	
	var radius1 = 1.0;
	var radius2 = 2.0;
	
	var circ1 = 2.0 * radius1 * Math.PI;
	var circ2 = 2.0 * radius2 * Math.PI;
	
	var normal1 = new JSM.Vector (0.0, 0.0, 1.0);
	var normal2 = new JSM.Vector (0.0, 0.0, -1.0);
	
	test.Assert (JSM.IsEqual (JSM.GetArcLength (a1, a1, radius1), 0.0));
	test.Assert (JSM.IsEqual (JSM.GetArcLength (a1, b1, radius1), circ1 / 4.0));
	test.Assert (JSM.IsEqual (JSM.GetArcLength (a2, b1, radius1), circ1 / 4.0));
	test.Assert (JSM.IsEqual (JSM.GetArcLength (a3, b1, radius1), circ1 / 2.0));
	test.Assert (JSM.IsEqual (JSM.GetArcLength (a4, b1, radius1), circ1 / 8.0));
	test.Assert (JSM.IsEqual (JSM.GetArcLength (a5, b1, radius1), circ1 / 8.0));

	test.Assert (JSM.IsEqual (JSM.GetArcLength (a1, a1, radius2), 0.0));
	test.Assert (JSM.IsEqual (JSM.GetArcLength (a1, b1, radius2), circ2 / 4.0));
	test.Assert (JSM.IsEqual (JSM.GetArcLength (a2, b1, radius2), circ2 / 4.0));
	test.Assert (JSM.IsEqual (JSM.GetArcLength (a3, b1, radius2), circ2 / 2.0));
	test.Assert (JSM.IsEqual (JSM.GetArcLength (a4, b1, radius2), circ2 / 8.0));
	test.Assert (JSM.IsEqual (JSM.GetArcLength (a5, b1, radius2), circ2 / 8.0));
	
	test.Assert (JSM.IsEqual (JSM.GetFullArcLength (a1, b1, radius1, normal1), circ1 * 3.0 / 4.0));
	test.Assert (JSM.IsEqual (JSM.GetFullArcLength (a2, b1, radius1, normal1), circ1 / 4.0));
	test.Assert (JSM.IsEqual (JSM.GetFullArcLength (a3, b1, radius1, normal1), circ1 / 2.0));
	test.Assert (JSM.IsEqual (JSM.GetFullArcLength (a4, b1, radius1, normal1), circ1 * 7.0 / 8.0));
	test.Assert (JSM.IsEqual (JSM.GetFullArcLength (a5, b1, radius1, normal1), circ1 / 8.0));

	test.Assert (JSM.IsEqual (JSM.GetFullArcLength (a1, b1, radius2, normal1), circ2 * 3.0 / 4.0));
	test.Assert (JSM.IsEqual (JSM.GetFullArcLength (a2, b1, radius2, normal1), circ2 / 4.0));
	test.Assert (JSM.IsEqual (JSM.GetFullArcLength (a3, b1, radius2, normal1), circ2 / 2.0));
	test.Assert (JSM.IsEqual (JSM.GetFullArcLength (a4, b1, radius2, normal1), circ2 * 7.0 / 8.0));
	test.Assert (JSM.IsEqual (JSM.GetFullArcLength (a5, b1, radius2, normal1), circ2 / 8.0));

	test.Assert (JSM.IsEqual (JSM.GetFullArcLength (a1, b1, radius1, normal2), circ1 / 4.0));
	test.Assert (JSM.IsEqual (JSM.GetFullArcLength (a2, b1, radius1, normal2), circ1 * 3.0 / 4.0));
	test.Assert (JSM.IsEqual (JSM.GetFullArcLength (a3, b1, radius1, normal2), circ1 / 2.0));
	test.Assert (JSM.IsEqual (JSM.GetFullArcLength (a4, b1, radius1, normal2), circ1 / 8.0));
	test.Assert (JSM.IsEqual (JSM.GetFullArcLength (a5, b1, radius1, normal2), circ1 * 7.0 / 8.0));
});

AddTest ('TransformationTest', function (test) {
	var transformation = new JSM.IdentityTransformation ();
	
	var coord = new JSM.Coord (1.0, 1.0, 1.0);
	var direction = new JSM.Vector (1.0, 0.0, 0.0);
	test.Assert (JSM.CoordIsEqual (transformation.Apply (coord), new JSM.Coord (1.0, 1.0, 1.0)));

	transformation = JSM.OffsetTransformation (direction, 1.0);
	test.Assert (JSM.CoordIsEqual (transformation.Apply (coord), new JSM.Coord (2.0, 1.0, 1.0)));

	transformation = JSM.TranslationTransformation (new JSM.Coord (1.0, 2.0, 3.0));
	test.Assert (JSM.CoordIsEqual (transformation.Apply (coord), new JSM.Coord (2.0, 3.0, 4.0)));

	var axis = new JSM.Vector (0.0, 0.0, 1.0);
	var angle = 90.0 * JSM.DegRad;
	transformation = JSM.RotationTransformation (axis, angle);
	test.Assert (JSM.CoordIsEqual (transformation.Apply (coord), new JSM.Coord (-1.0, 1.0, 1.0)));
	
	var trX = new JSM.RotationXTransformation (angle);
	var trY = new JSM.RotationYTransformation (angle);
	var trZ = new JSM.RotationZTransformation (angle);
	
	var axisX = new JSM.Vector (1.0, 0.0, 0.0);
	var axisY = new JSM.Vector (0.0, 1.0, 0.0);
	var axisZ = new JSM.Vector (0.0, 0.0, 1.0);
	
	var trRotX = new JSM.RotationTransformation (axisX, angle);
	var trRotY = new JSM.RotationTransformation (axisY, angle);
	var trRotZ = new JSM.RotationTransformation (axisZ, angle);

	test.Assert (JSM.CoordIsEqual (trX.Apply (coord), trRotX.Apply (coord)));
	test.Assert (JSM.CoordIsEqual (trY.Apply (coord), trRotY.Apply (coord)));
	test.Assert (JSM.CoordIsEqual (trZ.Apply (coord), trRotZ.Apply (coord)));

	var origo = new JSM.Coord (0.0, 0.0, 0.0);
	trRotX = new JSM.RotationTransformation (axisX, angle, origo);
	trRotY = new JSM.RotationTransformation (axisY, angle, origo);
	trRotZ = new JSM.RotationTransformation (axisZ, angle, origo);

	test.Assert (JSM.CoordIsEqual (trX.Apply (coord), trRotX.Apply (coord)));
	test.Assert (JSM.CoordIsEqual (trY.Apply (coord), trRotY.Apply (coord)));
	test.Assert (JSM.CoordIsEqual (trZ.Apply (coord), trRotZ.Apply (coord)));

	var origo = new JSM.Coord (1.0, 2.0, 3.0);
	var trXOrigo = new JSM.RotationXTransformation (angle, origo);
	var trYOrigo = new JSM.RotationYTransformation (angle, origo);
	var trZOrigo = new JSM.RotationZTransformation (angle, origo);

	var trRotXOrigo = new JSM.RotationTransformation (axisX, angle, origo);
	var trRotYOrigo = new JSM.RotationTransformation (axisY, angle, origo);
	var trRotZOrigo = new JSM.RotationTransformation (axisZ, angle, origo);

	test.Assert (JSM.CoordIsEqual (trXOrigo.Apply (coord), trRotXOrigo.Apply (coord)));
	test.Assert (JSM.CoordIsEqual (trYOrigo.Apply (coord), trRotYOrigo.Apply (coord)));
	test.Assert (JSM.CoordIsEqual (trZOrigo.Apply (coord), trRotZOrigo.Apply (coord)));

	var coord = new JSM.Coord (2.0, 0.0, 0.0);
	transformation = new JSM.RotationZTransformation (90.0 * JSM.DegRad, new JSM.Coord (0.0, 0.0, 0.0));
	test.Assert (JSM.CoordIsEqual (transformation.Apply (coord), new JSM.Coord (0.0, 2.0, 0.0)));
	transformation = new JSM.RotationZTransformation (90.0 * JSM.DegRad, new JSM.Coord (1.0, 0.0, 0.0));
	test.Assert (JSM.CoordIsEqual (transformation.Apply (coord), new JSM.Coord (1.0, 1.0, 0.0)));

	var coord = new JSM.Coord (1.0, 2.0, 3.0);
	var axis = new JSM.Vector (4.0, 5.0, 6.0);
	var angle = 7.0 * JSM.DegRad;
	var origo = new JSM.Coord (8.0, 9.0, 10.0);
	transformation = new JSM.RotationTransformation (axis, angle, origo);
	test.Assert (JSM.CoordIsEqual (JSM.CoordRotate (coord, axis, angle, origo), transformation.Apply (coord)));
	
	var coord = new JSM.Coord (1.0, 2.0, 3.0);
	var direction = new JSM.Coord (4.0, 5.0, 6.0);
	var axis = new JSM.Vector (4.0, 5.0, 6.0);
	var angle = 7.0 * JSM.DegRad;
	var origo = new JSM.Coord (8.0, 9.0, 10.0);
	var result1 = coord;
	result1 = JSM.CoordOffset (result1, direction, 11.0);
	result1 = JSM.CoordRotate (result1, axis, angle, origo);
	
	var offsetTransformation = new JSM.OffsetTransformation (direction, 11.0);
	var rotateTransformation = new JSM.RotationTransformation (axis, angle, origo);
	
	var transformation = new JSM.Transformation ();
	transformation.Append (offsetTransformation);
	transformation.Append (rotateTransformation);
	
	var result2 = transformation.Apply (coord);
	test.Assert (JSM.CoordIsEqual (result1, result2));
});

AddTest ('SystemConversionTest', function (test) {
	var system1 = new JSM.CoordSystem (
		new JSM.Coord (0.0, 0.0, 0.0),
		new JSM.Vector (0.0, 1.0, 0.0),
		new JSM.Vector (-1.0, 0.0, 0.0),
		new JSM.Vector (0.0, 0.0, 1.0)
	);

	var system2 = new JSM.CoordSystem (
		new JSM.Coord (0.0, 0.0, 0.0),
		new JSM.Vector (1.0, 0.0, 0.0),
		new JSM.Vector (0.0, 1.0, 0.0),
		new JSM.Vector (0.0, 0.0, 1.0)
	);

	var transformation = new JSM.SystemConversionTransformation (system1.e1, system1.e2, system1.e3, system2.e1, system2.e2, system2.e3);
	
	var coord0 = new JSM.Coord (0.0, 0.0, 0.0);
	var coord1 = new JSM.Coord (1.0, 0.0, 0.0);
	var coord2 = new JSM.Coord (0.0, 1.0, 0.0);
	var coord3 = new JSM.Coord (0.0, 0.0, 1.0);
	var coord4 = new JSM.Coord (1.0, 1.0, 0.0);
	var coord5 = new JSM.Coord (-1.0, 1.0, 0.0);
	
	test.Assert (JSM.CoordIsEqual (transformation.Apply (coord0), new JSM.Coord (0.0, 0.0, 0.0)));
	test.Assert (JSM.CoordIsEqual (transformation.Apply (coord1), new JSM.Coord (0.0, 1.0, 0.0)));
	test.Assert (JSM.CoordIsEqual (transformation.Apply (coord2), new JSM.Coord (-1.0, 0.0, 0.0)));
	test.Assert (JSM.CoordIsEqual (transformation.Apply (coord3), new JSM.Coord (0.0, 0.0, 1.0)));
	test.Assert (JSM.CoordIsEqual (transformation.Apply (coord4), new JSM.Coord (-1.0, 1.0, 0.0)));
	test.Assert (JSM.CoordIsEqual (transformation.Apply (coord5), new JSM.Coord (-1.0, -1.0, 0.0)));

	test.Assert (JSM.CoordIsEqual (JSM.ChangeCoordSystem (coord0, system1, system2), new JSM.Coord (0.0, 0.0, 0.0)));
	test.Assert (JSM.CoordIsEqual (JSM.ChangeCoordSystem (coord1, system1, system2), new JSM.Coord (0.0, 1.0, 0.0)));
	test.Assert (JSM.CoordIsEqual (JSM.ChangeCoordSystem (coord2, system1, system2), new JSM.Coord (-1.0, 0.0, 0.0)));
	test.Assert (JSM.CoordIsEqual (JSM.ChangeCoordSystem (coord3, system1, system2), new JSM.Coord (0.0, 0.0, 1.0)));
	test.Assert (JSM.CoordIsEqual (JSM.ChangeCoordSystem (coord4, system1, system2), new JSM.Coord (-1.0, 1.0, 0.0)));
	test.Assert (JSM.CoordIsEqual (JSM.ChangeCoordSystem (coord5, system1, system2), new JSM.Coord (-1.0, -1.0, 0.0)));
	
	system2.origo.x = 1.0;
	test.Assert (JSM.CoordIsEqual (JSM.ChangeCoordSystem (coord0, system1, system2), new JSM.Coord (1.0, 0.0, 0.0)));
	test.Assert (JSM.CoordIsEqual (JSM.ChangeCoordSystem (coord1, system1, system2), new JSM.Coord (1.0, 1.0, 0.0)));
	test.Assert (JSM.CoordIsEqual (JSM.ChangeCoordSystem (coord2, system1, system2), new JSM.Coord (0.0, 0.0, 0.0)));
	test.Assert (JSM.CoordIsEqual (JSM.ChangeCoordSystem (coord3, system1, system2), new JSM.Coord (1.0, 0.0, 1.0)));
	test.Assert (JSM.CoordIsEqual (JSM.ChangeCoordSystem (coord4, system1, system2), new JSM.Coord (0.0, 1.0, 0.0)));
	test.Assert (JSM.CoordIsEqual (JSM.ChangeCoordSystem (coord5, system1, system2), new JSM.Coord (0.0, -1.0, 0.0)));

	system1.origo.x = 1.0;
	system2.origo.x = 2.0;
	test.Assert (JSM.CoordIsEqual (JSM.ChangeCoordSystem (coord0, system1, system2), new JSM.Coord (2.0, -1.0, 0.0)));
	test.Assert (JSM.CoordIsEqual (JSM.ChangeCoordSystem (coord1, system1, system2), new JSM.Coord (2.0, 0.0, 0.0)));
	test.Assert (JSM.CoordIsEqual (JSM.ChangeCoordSystem (coord2, system1, system2), new JSM.Coord (1.0, -1.0, 0.0)));
	test.Assert (JSM.CoordIsEqual (JSM.ChangeCoordSystem (coord3, system1, system2), new JSM.Coord (2.0, -1.0, 1.0)));
	test.Assert (JSM.CoordIsEqual (JSM.ChangeCoordSystem (coord4, system1, system2), new JSM.Coord (1.0, 0.0, 0.0)));
	test.Assert (JSM.CoordIsEqual (JSM.ChangeCoordSystem (coord5, system1, system2), new JSM.Coord (1.0, -2.0, 0.0)));

	test.Assert (JSM.CoordIsEqual (JSM.ChangeCoordSystem (new JSM.Coord (2.0, -1.0, 0.0), system2, system1), coord0));
	test.Assert (JSM.CoordIsEqual (JSM.ChangeCoordSystem (new JSM.Coord (2.0, 0.0, 0.0), system2, system1), coord1));
	test.Assert (JSM.CoordIsEqual (JSM.ChangeCoordSystem (new JSM.Coord (1.0, -1.0, 0.0), system2, system1), coord2));
	test.Assert (JSM.CoordIsEqual (JSM.ChangeCoordSystem (new JSM.Coord (2.0, -1.0, 1.0), system2, system1), coord3));
	test.Assert (JSM.CoordIsEqual (JSM.ChangeCoordSystem (new JSM.Coord (1.0, 0.0, 0.0), system2, system1), coord4));
	test.Assert (JSM.CoordIsEqual (JSM.ChangeCoordSystem (new JSM.Coord (1.0, -2.0, 0.0), system2, system1), coord5));

	var o1 = new JSM.Coord (1.0, 0.0, 0.0);
	var o2 = new JSM.Coord (2.0, 0.0, 0.0);
	test.Assert (JSM.CoordIsEqual (JSM.ChangeCoordSystem (o1, system1, system2), new JSM.Coord (2.0, 0.0, 0.0)));
	test.Assert (JSM.CoordIsEqual (JSM.ChangeCoordSystem (o2, system2, system1), new JSM.Coord (1.0, 0.0, 0.0)));
});

AddTest ('SectorTest', function (test) {
	var beg = new JSM.Coord2D (1.0, 2.0);
	var end = new JSM.Coord2D (3.0, 4.0);
	
	var sector = new JSM.Sector2D (beg, end);
	test.Assert (JSM.CoordIsEqual2D (sector.beg, new JSM.Coord2D (1.0, 2.0)));
	test.Assert (JSM.CoordIsEqual2D (sector.end, new JSM.Coord2D (3.0, 4.0)));
	
	sector.Set (end, beg);
	test.Assert (JSM.CoordIsEqual2D (sector.beg, new JSM.Coord2D (3.0, 4.0)));
	test.Assert (JSM.CoordIsEqual2D (sector.end, new JSM.Coord2D (1.0, 2.0)));

	var beg = new JSM.Coord (1.0, 2.0, 3.0);
	var end = new JSM.Coord (4.0, 5.0, 6.0);
	
	var sector = new JSM.Sector (beg, end);
	test.Assert (JSM.CoordIsEqual (sector.beg, new JSM.Coord (1.0, 2.0, 3.0)));
	test.Assert (JSM.CoordIsEqual (sector.end, new JSM.Coord (4.0, 5.0, 6.0)));
	
	sector.Set (end, beg);
	test.Assert (JSM.CoordIsEqual (sector.beg, new JSM.Coord (4.0, 5.0, 6.0)));
	test.Assert (JSM.CoordIsEqual (sector.end, new JSM.Coord (1.0, 2.0, 3.0)));
});

AddTest ('LineTest', function (test)
{
	var start2D = new JSM.Coord2D (1.0, 1.0);
	var direction2D = new JSM.Coord2D (1.0, 0.0);
	var line2D = new JSM.Line2D (start2D, direction2D);
	test.Assert (JSM.CoordLinePosition2D (new JSM.Coord2D (0.0, 0.0), line2D) == 'CoordAtLineRight');
	test.Assert (JSM.CoordLinePosition2D (new JSM.Coord2D (0.0, 2.0), line2D) == 'CoordAtLineLeft');
	test.Assert (JSM.CoordLinePosition2D (new JSM.Coord2D (0.0, 1.0), line2D) == 'CoordOnLine');

	var start = new JSM.Coord (1.0, 1.0, 1.0);
	var direction = new JSM.Coord (1.0, 0.0, 0.0);
	var line = new JSM.Line (start, direction);

	var projected = new JSM.Coord ();
	test.Assert (JSM.CoordLinePosition (new JSM.Coord (0.0, 0.0, 0.0), line, projected) == 'CoordOutsideOfLine');
	test.Assert (JSM.CoordIsEqual (projected, new JSM.Coord (0.0, 1.0, 1.0)));
	test.Assert (JSM.CoordLinePosition (new JSM.Coord (1.0, 1.0, 1.0), line, projected) == 'CoordOnLine');
	test.Assert (JSM.CoordIsEqual (projected, new JSM.Coord (1.0, 1.0, 1.0)));
	test.Assert (JSM.CoordLinePosition (new JSM.Coord (2.0, 1.0, 1.0), line, projected) == 'CoordOnLine');
	test.Assert (JSM.CoordIsEqual (projected, new JSM.Coord (2.0, 1.0, 1.0)));

	test.Assert (JSM.CoordIsEqual (JSM.ProjectCoordToLine (new JSM.Coord (0.0, 0.0, 0.0), line), new JSM.Coord (0.0, 1.0, 1.0)));
	test.Assert (JSM.CoordIsEqual (JSM.ProjectCoordToLine (new JSM.Coord (1.0, 1.0, 1.0), line), new JSM.Coord (1.0, 1.0, 1.0)));
	test.Assert (JSM.CoordIsEqual (JSM.ProjectCoordToLine (new JSM.Coord (2.0, 1.0, 1.0), line), new JSM.Coord (2.0, 1.0, 1.0)));
	
	var line1 = new JSM.Line (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Coord (1.0, 0.0, 0.0));
	var line2 = new JSM.Line (new JSM.Coord (0.0, 1.0, 0.0), new JSM.Coord (1.0, 0.0, 0.0));
	var line3 = new JSM.Line (new JSM.Coord (0.0, 0.5, 0.0), new JSM.Coord (0.0, 1.0, 0.0));
	var line4 = new JSM.Line (new JSM.Coord (2.0, 3.0, 0.0), new JSM.Coord (0.0, 1.0, 0.0));
	var line5 = new JSM.Line (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Coord (1.0, 1.0, 0.0));
	var line6 = new JSM.Line (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Coord (0.0, 0.0, 1.0));
	var line7 = new JSM.Line (new JSM.Coord (0.0, 0.0, 1.0), new JSM.Coord (1.0, 0.0, 0.0));
	var line8 = new JSM.Line (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Coord (1.0, 1.0, 1.0));
	var line9 = new JSM.Line (new JSM.Coord (1.0, 0.0, 0.0), new JSM.Coord (-1.0, 1.0, 1.0));
	
	var intersection = new JSM.Coord ();
	test.Assert (JSM.LineLinePosition (line1, line1, intersection) == 'LinesIntersectsCoincident');
	test.Assert (JSM.LineLinePosition (line1, line2, intersection) == 'LinesIntersectsCoincident');
	test.Assert (JSM.LineLinePosition (line1, line7, intersection) == 'LinesIntersectsCoincident');
	test.Assert (JSM.LineLinePosition (line2, line7, intersection) == 'LinesIntersectsCoincident');
	test.Assert (JSM.LineLinePosition (line3, line7, intersection) == 'LinesDontIntersects');
	test.Assert (JSM.LineLinePosition (line4, line7, intersection) == 'LinesDontIntersects');
	test.Assert (JSM.LineLinePosition (line5, line7, intersection) == 'LinesDontIntersects');
	test.Assert (JSM.LineLinePosition (line6, line7, intersection) == 'LinesIntersectsOnePoint');
	test.Assert (JSM.CoordIsEqual (intersection, new JSM.Coord (0.0, 0.0, 1.0)));
	test.Assert (JSM.LineLinePosition (line1, line3, intersection) == 'LinesIntersectsOnePoint');
	test.Assert (JSM.CoordIsEqual (intersection, new JSM.Coord (0.0, 0.0, 0.0)));
	test.Assert (JSM.LineLinePosition (line1, line4, intersection) == 'LinesIntersectsOnePoint');
	test.Assert (JSM.CoordIsEqual (intersection, new JSM.Coord (2.0, 0.0, 0.0)));
	test.Assert (JSM.LineLinePosition (line1, line5, intersection) == 'LinesIntersectsOnePoint');
	test.Assert (JSM.CoordIsEqual (intersection, new JSM.Coord (0.0, 0.0, 0.0)));
	test.Assert (JSM.LineLinePosition (line2, line3, intersection) == 'LinesIntersectsOnePoint');
	test.Assert (JSM.CoordIsEqual (intersection, new JSM.Coord (0.0, 1.0, 0.0)));
	test.Assert (JSM.LineLinePosition (line2, line4, intersection) == 'LinesIntersectsOnePoint');
	test.Assert (JSM.CoordIsEqual (intersection, new JSM.Coord (2.0, 1.0, 0.0)));
	test.Assert (JSM.LineLinePosition (line2, line5, intersection) == 'LinesIntersectsOnePoint');
	test.Assert (JSM.CoordIsEqual (intersection, new JSM.Coord (1.0, 1.0, 0.0)));
	test.Assert (JSM.LineLinePosition (line5, line6, intersection) == 'LinesIntersectsOnePoint');
	test.Assert (JSM.CoordIsEqual (intersection, new JSM.Coord (0.0, 0.0, 0.0)));
	test.Assert (JSM.LineLinePosition (line6, line7, intersection) == 'LinesIntersectsOnePoint');
	test.Assert (JSM.CoordIsEqual (intersection, new JSM.Coord (0.0, 0.0, 1.0)));
	test.Assert (JSM.LineLinePosition (line8, line9, intersection) == 'LinesIntersectsOnePoint');
	test.Assert (JSM.CoordIsEqual (intersection, new JSM.Coord (0.5, 0.5, 0.5)));
});

AddTest ('CoordSectorPositionTest', function (test)
{
	var coord = new JSM.Coord2D (1.0, 0.0);
	var sector = new JSM.Sector2D (new JSM.Coord2D (0.0, 1.0), new JSM.Coord2D (1.0, 1.0));
	test.Assert (JSM.CoordSectorPosition2D (coord, sector) == 'CoordOutsideOfSector');

	var sector1 = new JSM.Sector2D (new JSM.Coord2D (1.0, 2.0), new JSM.Coord2D (1.0, 2.0));
	var sector2 = new JSM.Sector2D (new JSM.Coord2D (1.0, 2.0), new JSM.Coord2D (4.0, 3.0));
	var sector3 = new JSM.Sector2D (new JSM.Coord2D (1.0, 1.0), new JSM.Coord2D (3.0, 1.0));
	var sector4 = new JSM.Sector2D (new JSM.Coord2D (0.0, 1.0), new JSM.Coord2D (1.0, 1.0));

	test.Assert (JSM.CoordSectorPosition2D (new JSM.Coord2D (0.0, 0.0), sector1) == 'CoordOutsideOfSector');
	test.Assert (JSM.CoordSectorPosition2D (new JSM.Coord2D (1.0, 2.0), sector1) == 'CoordOnSectorEndCoord');
	test.Assert (JSM.CoordSectorPosition2D (new JSM.Coord2D (1.0, 2.001), sector1) == 'CoordOutsideOfSector');

	test.Assert (JSM.CoordSectorPosition2D (new JSM.Coord2D (0.0, 0.0), sector2) == 'CoordOutsideOfSector');
	test.Assert (JSM.CoordSectorPosition2D (new JSM.Coord2D (7.0, 5.0), sector2) == 'CoordOutsideOfSector');
	test.Assert (JSM.CoordSectorPosition2D (new JSM.Coord2D (-2.0, 2.0), sector2) == 'CoordOutsideOfSector');
	test.Assert (JSM.CoordSectorPosition2D (new JSM.Coord2D (2.0, 2.0), sector2) == 'CoordOutsideOfSector');
	test.Assert (JSM.CoordSectorPosition2D (new JSM.Coord2D (3.0, 2.5), sector2) == 'CoordOutsideOfSector');
	test.Assert (JSM.CoordSectorPosition2D (new JSM.Coord2D (2.0, 3.0), sector2) == 'CoordOutsideOfSector');
	test.Assert (JSM.CoordSectorPosition2D (new JSM.Coord2D (3.0, 3.0), sector2) == 'CoordOutsideOfSector');
	test.Assert (JSM.CoordSectorPosition2D (new JSM.Coord2D (1.0, 2.0), sector2) == 'CoordOnSectorEndCoord');
	test.Assert (JSM.CoordSectorPosition2D (new JSM.Coord2D (4.0, 3.0), sector2) == 'CoordOnSectorEndCoord');
	test.Assert (JSM.CoordSectorPosition2D (new JSM.Coord2D (2.5, 2.5), sector2) == 'CoordInsideOfSector');
	test.Assert (JSM.CoordSectorPosition2D (new JSM.Coord2D (1.75, 2.25), sector2) == 'CoordInsideOfSector');
	test.Assert (JSM.CoordSectorPosition2D (new JSM.Coord2D (2.5, 2.501), sector2) == 'CoordOutsideOfSector');
	test.Assert (JSM.CoordSectorPosition2D (new JSM.Coord2D (1.75, 2.26), sector2) == 'CoordOutsideOfSector');

	test.Assert (JSM.CoordSectorPosition2D (new JSM.Coord2D (4.0, 1.0), sector3) == 'CoordOutsideOfSector');
	test.Assert (JSM.CoordSectorPosition2D (new JSM.Coord2D (3.001, 1.0), sector3) == 'CoordOutsideOfSector');
	test.Assert (JSM.CoordSectorPosition2D (new JSM.Coord2D (0.0, 1.0), sector3) == 'CoordOutsideOfSector');
	test.Assert (JSM.CoordSectorPosition2D (new JSM.Coord2D (0.999, 1.0), sector3) == 'CoordOutsideOfSector');
	test.Assert (JSM.CoordSectorPosition2D (new JSM.Coord2D (1.0, 1.0), sector3) == 'CoordOnSectorEndCoord');
	test.Assert (JSM.CoordSectorPosition2D (new JSM.Coord2D (3.0, 1.0), sector3) == 'CoordOnSectorEndCoord');
	test.Assert (JSM.CoordSectorPosition2D (new JSM.Coord2D (1.1, 1.0), sector3) == 'CoordInsideOfSector');
	test.Assert (JSM.CoordSectorPosition2D (new JSM.Coord2D (1.123456789, 1.0), sector3) == 'CoordInsideOfSector');

	test.Assert (JSM.CoordSectorPosition2D (new JSM.Coord2D (0.0, 0.0), sector4) == 'CoordOutsideOfSector');
});

AddTest ('SectorSectorPosition2DTest', function (test)
{
	var GetSector2D = function (a, b, c, d)
	{
		return new JSM.Sector2D (new JSM.Coord2D (a, b), new JSM.Coord2D (c, d));
	}

	var sector1 = new JSM.Sector2D (new JSM.Coord2D (0.0, 1.0), new JSM.Coord2D (1.0, 1.0));
	var sector2 = new JSM.Sector2D (new JSM.Coord2D (0.0, 2.0), new JSM.Coord2D (1.0, 2.0));
	test.Assert (JSM.SectorSectorPosition2D (sector1, sector2) == 'SectorsDontIntersects');

	var sector1 = new JSM.Sector2D (new JSM.Coord2D (1.0, 2.0), new JSM.Coord2D (1.0, 2.0));
	var sector2 = new JSM.Sector2D (new JSM.Coord2D (1.0, 2.0), new JSM.Coord2D (4.0, 3.0));
	var sector3 = new JSM.Sector2D (new JSM.Coord2D (1.0, 1.0), new JSM.Coord2D (3.0, 1.0));
	var sector4 = new JSM.Sector2D (new JSM.Coord2D (0.0, 1.0), new JSM.Coord2D (1.0, 1.0));

	var intersection = new JSM.Coord2D ();
	test.Assert (JSM.SectorSectorPosition2D (sector3, GetSector2D (0.0, 0.0, 0.0, 1.0)) == 'SectorsDontIntersects');
	test.Assert (JSM.SectorSectorPosition2D (sector3, GetSector2D (0.0, 0.0, 1.0, 0.0)) == 'SectorsDontIntersects');
	test.Assert (JSM.SectorSectorPosition2D (sector3, GetSector2D (0.0, 0.0, 1.0, 1.0), intersection) == 'SectorsIntersectsEndPoint');
	test.Assert (JSM.CoordIsEqual2D (intersection, new JSM.Coord2D (1.0, 1.0)));
	test.Assert (JSM.SectorSectorPosition2D (sector3, GetSector2D (0.0, 0.0, 3.0, 1.0), intersection) == 'SectorsIntersectsEndPoint');
	test.Assert (JSM.CoordIsEqual2D (intersection, new JSM.Coord2D (3.0, 1.0)));
	test.Assert (JSM.SectorSectorPosition2D (sector3, GetSector2D (1.0, 1.0, 3.0, 1.0)) == 'SectorsIntersectsCoincident');
	test.Assert (JSM.SectorSectorPosition2D (sector3, GetSector2D (3.0, 1.0, 1.0, 1.0)) == 'SectorsIntersectsCoincident');

	test.Assert (JSM.SectorSectorPosition2D (sector3, GetSector2D (1.0, 0.0, 1.0, 1.0)) == 'SectorsIntersectsEndPoint');
	test.Assert (JSM.SectorSectorPosition2D (sector3, GetSector2D (1.0, 0.0, 1.0, 2.0)) == 'SectorsIntersectsEndPoint');
	test.Assert (JSM.SectorSectorPosition2D (sector3, GetSector2D (3.0, 0.0, 3.0, 1.0)) == 'SectorsIntersectsEndPoint');
	test.Assert (JSM.SectorSectorPosition2D (sector3, GetSector2D (3.0, 0.0, 3.0, 2.0)) == 'SectorsIntersectsEndPoint');
	test.Assert (JSM.SectorSectorPosition2D (sector3, GetSector2D (2.0, 0.0, 4.0, 2.0)) == 'SectorsIntersectsEndPoint');

	test.Assert (JSM.SectorSectorPosition2D (sector3, GetSector2D (-1.0, 1.0, 0.0, 1.0)) == 'SectorsDontIntersects');
	test.Assert (JSM.SectorSectorPosition2D (sector3, GetSector2D (4.0, 1.0, 5.0, 1.0)) == 'SectorsDontIntersects');
	test.Assert (JSM.SectorSectorPosition2D (sector3, GetSector2D (0.0, 0.0, 2.0, 0.0)) == 'SectorsDontIntersects');
	test.Assert (JSM.SectorSectorPosition2D (sector3, GetSector2D (1.0, 0.0, 3.0, 0.0)) == 'SectorsDontIntersects');
	test.Assert (JSM.SectorSectorPosition2D (sector3, GetSector2D (1.0, 2.0, 3.0, 2.0)) == 'SectorsDontIntersects');
	test.Assert (JSM.SectorSectorPosition2D (sector3, GetSector2D (0.0, 1.0, 1.0, 1.0)) == 'SectorsIntersectsEndPoint');
	test.Assert (JSM.SectorSectorPosition2D (sector3, GetSector2D (3.0, 1.0, 4.0, 1.0)) == 'SectorsIntersectsEndPoint');
	test.Assert (JSM.SectorSectorPosition2D (sector3, GetSector2D (0.0, 1.0, 2.0, 1.0)) == 'SectorsIntersectsCoincident');
	test.Assert (JSM.SectorSectorPosition2D (sector3, GetSector2D (2.0, 1.0, 2.5, 1.0)) == 'SectorsIntersectsCoincident');
	test.Assert (JSM.SectorSectorPosition2D (sector3, GetSector2D (2.0, 1.0, 3.0, 1.0)) == 'SectorsIntersectsCoincident');
	test.Assert (JSM.SectorSectorPosition2D (sector3, GetSector2D (2.0, 1.0, 4.0, 1.0)) == 'SectorsIntersectsCoincident');

	test.Assert (JSM.SectorSectorPosition2D (sector3, GetSector2D (4.0, 1.0, 5.0, 1.0)) == 'SectorsDontIntersects');
	test.Assert (JSM.SectorSectorPosition2D (sector3, GetSector2D (-1.0, 1.0, -3.0, 1.0)) == 'SectorsDontIntersects');

	test.Assert (JSM.SectorSectorPosition2D (GetSector2D (-1.0, 1.0, 0.0, 1.0), sector3) == 'SectorsDontIntersects');
	test.Assert (JSM.SectorSectorPosition2D (GetSector2D (4.0, 1.0, 5.0, 1.0), sector3) == 'SectorsDontIntersects');
	test.Assert (JSM.SectorSectorPosition2D (GetSector2D (0.0, 0.0, 2.0, 0.0), sector3) == 'SectorsDontIntersects');
	test.Assert (JSM.SectorSectorPosition2D (GetSector2D (1.0, 0.0, 3.0, 0.0), sector3) == 'SectorsDontIntersects');
	test.Assert (JSM.SectorSectorPosition2D (GetSector2D (1.0, 2.0, 3.0, 2.0), sector3) == 'SectorsDontIntersects');
	test.Assert (JSM.SectorSectorPosition2D (GetSector2D (0.0, 1.0, 1.0, 1.0), sector3) == 'SectorsIntersectsEndPoint');
	test.Assert (JSM.SectorSectorPosition2D (GetSector2D (3.0, 1.0, 4.0, 1.0), sector3) == 'SectorsIntersectsEndPoint');
	test.Assert (JSM.SectorSectorPosition2D (GetSector2D (0.0, 1.0, 2.0, 1.0), sector3) == 'SectorsIntersectsCoincident');
	test.Assert (JSM.SectorSectorPosition2D (GetSector2D (2.0, 1.0, 2.5, 1.0), sector3) == 'SectorsIntersectsCoincident');
	test.Assert (JSM.SectorSectorPosition2D (GetSector2D (2.0, 1.0, 3.0, 1.0), sector3) == 'SectorsIntersectsCoincident');
	test.Assert (JSM.SectorSectorPosition2D (GetSector2D (2.0, 1.0, 4.0, 1.0), sector3) == 'SectorsIntersectsCoincident');
});

AddTest ('CoordPolygonPosition2DTest', function (test)
{
	var polygon = new JSM.Polygon2D ();
	polygon.AddVertex (0.0, 2.0);
	polygon.AddVertex (0.0, 1.0);
	polygon.AddVertex (1.0, 1.0);
	polygon.AddVertex (1.0, 0.0);
	polygon.AddVertex (2.0, 0.0);
	polygon.AddVertex (2.0, 1.0);
	polygon.AddVertex (3.0, 1.0);
	polygon.AddVertex (3.0, 2.0);
	polygon.AddVertex (1.5, 3.0);

	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (0.0, 0.0), polygon) == 'CoordOutsideOfPolygon');
	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (0.5, 5.0), polygon) == 'CoordOutsideOfPolygon');
	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (0.0, 3.0), polygon) == 'CoordOutsideOfPolygon');
	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (1.0, 4.0), polygon) == 'CoordOutsideOfPolygon');
	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (3.0, 0.0), polygon) == 'CoordOutsideOfPolygon');
	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (2.5, 0.5), polygon) == 'CoordOutsideOfPolygon');
	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (4.0, 2.0), polygon) == 'CoordOutsideOfPolygon');
	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (-1.0, 1.0), polygon) == 'CoordOutsideOfPolygon');

	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (0.0, 1.5), polygon) == 'CoordOnPolygonEdge');
	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (0.5, 1.0), polygon) == 'CoordOnPolygonEdge');
	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (1.0, 0.5), polygon) == 'CoordOnPolygonEdge');
	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (1.5, 0.0), polygon) == 'CoordOnPolygonEdge');

	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (0.0, 2.0), polygon) == 'CoordOnPolygonEdge');
	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (0.0, 1.0), polygon) == 'CoordOnPolygonEdge');
	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (1.0, 1.0), polygon) == 'CoordOnPolygonEdge');
	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (3.0, 2.0), polygon) == 'CoordOnPolygonEdge');

	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (0.5, 1.5), polygon) == 'CoordInsideOfPolygon');
	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (1.5, 0.5), polygon) == 'CoordInsideOfPolygon');
	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (1.5, 1.5), polygon) == 'CoordInsideOfPolygon');
	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (2.5, 1.5), polygon) == 'CoordInsideOfPolygon');
	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (1.5, 1.0), polygon) == 'CoordInsideOfPolygon');
});

AddTest ('PolygonTest', function (test)
{
	var polygon = new JSM.Polygon2D ();
	polygon.AddVertex (0.0, 0.0);
	polygon.AddVertex (1.0, 0.0);
	polygon.AddVertex (0.0, 1.0);
	test.Assert (JSM.IsEqual (JSM.PolygonSignedArea2D (polygon), 0.5));
	test.Assert (JSM.PolygonOrientation2D (polygon) == 'CounterClockwise');
	test.Assert (JSM.PolygonComplexity2D (polygon) == 'Convex');
	test.Assert (JSM.CoordPolygonPosition2D (new JSM.Coord2D (0.2, 0.2), polygon) == 'CoordInsideOfPolygon');

	var polygon = new JSM.Polygon2D ();
	polygon.AddVertex (0.0, 0.0);
	polygon.AddVertex (1.0, 0.0);
	polygon.AddVertex (1.0, 1.0);
	polygon.AddVertex (0.0, 1.0);
	test.Assert (JSM.IsPolygonVertexVisible2D (polygon, 0, 2) == true);
	
	var triangles = JSM.PolygonTriangulate2D (polygon);
	test.Assert (triangles.length == 2);
	test.Assert (triangles[0].toString () == '0,1,2');
	test.Assert (triangles[1].toString () == '0,2,3');
	test.Assert (JSM.CheckTriangulation2D (polygon, triangles) == true);

	var polygon = new JSM.Polygon ();
	polygon.AddVertex (0.0, 0.0, 0.0);
	polygon.AddVertex (1.0, 0.0, 0.0);
	polygon.AddVertex (1.0, 1.0, 0.0);
	polygon.AddVertex (0.0, 1.0, 0.0);
	var triangles = JSM.PolygonTriangulate (polygon);
	test.Assert (triangles.length == 2);
	test.Assert (triangles[0].toString () == '0,1,2');
	test.Assert (triangles[1].toString () == '0,2,3');
});

AddTest ('PolygonVertexVisibility2DTest', function (test)
{
	function GetVisibleVertices (polygon, from)
	{
		var result = [];
		for (var i = 0; i < polygon.Count (); i++) {
			if (JSM.IsPolygonVertexVisible2D (polygon, from, i)) {
				result.push (i);
			}
		}
		return result;
	}

	var polygon = new JSM.Polygon2D ();
	polygon.AddVertex (0.0, 0.0);
	polygon.AddVertex (3.0, 0.0);
	polygon.AddVertex (3.0, 2.0);
	polygon.AddVertex (2.0, 2.0);
	polygon.AddVertex (2.0, 1.0);
	polygon.AddVertex (1.0, 1.0);
	polygon.AddVertex (1.0, 2.0);
	polygon.AddVertex (0.0, 2.0);
	
	test.Assert (GetVisibleVertices (polygon, 0).toString () == [4, 5, 6].toString ());
	test.Assert (GetVisibleVertices (polygon, 1).toString () == [3, 4, 5].toString ());
	test.Assert (GetVisibleVertices (polygon, 2).toString () == [4].toString ());
	test.Assert (GetVisibleVertices (polygon, 3).toString () == [1].toString ());
	test.Assert (GetVisibleVertices (polygon, 4).toString () == [0, 1, 2].toString ());
	test.Assert (GetVisibleVertices (polygon, 5).toString () == [0, 1, 7].toString ());
	test.Assert (GetVisibleVertices (polygon, 6).toString () == [0].toString ());
	test.Assert (GetVisibleVertices (polygon, 7).toString () == [5].toString ());

	var polygon5 = new JSM.Polygon2D ();
	polygon5.AddVertex (118, 121);
	polygon5.AddVertex (244, 89);
	polygon5.AddVertex (188, 222);
	polygon5.AddVertex (104, 219);
	polygon5.AddVertex (135, 139);
	polygon5.AddVertex (167, 140);
	polygon5.AddVertex (152, 189);
	polygon5.AddVertex (170, 189);
	polygon5.AddVertex (192, 118);
	
	test.Assert (JSM.IsPolygonVertexVisible2D (polygon5, 1, 4) == false);
});

AddTest ('PolygonTriangulation2DTest', function (test)
{
	var polygon = new JSM.Polygon2D ();
	polygon.AddVertex (0.0, 0.0);
	polygon.AddVertex (3.0, 0.0);
	polygon.AddVertex (3.0, 2.0);
	polygon.AddVertex (1.5, 3.0);
	polygon.AddVertex (0.0, 2.0);
	
	var triangles = JSM.PolygonTriangulate2D (polygon);
	test.Assert (JSM.CheckTriangulation2D (polygon, triangles));
	test.Assert (triangles.length == 3);
	test.Assert (triangles[0].toString () == [0, 1, 2].toString ());
	test.Assert (triangles[1].toString () == [0, 2, 3].toString ());
	test.Assert (triangles[2].toString () == [0, 3, 4].toString ());

	var polygon2 = new JSM.Polygon2D ();
	polygon2.AddVertex (0.0, 0.0);
	polygon2.AddVertex (3.0, 0.0);
	polygon2.AddVertex (3.0, 2.0);
	polygon2.AddVertex (2.0, 2.0);
	polygon2.AddVertex (2.0, 1.0);
	polygon2.AddVertex (1.0, 1.0);
	polygon2.AddVertex (1.0, 2.0);
	polygon2.AddVertex (0.0, 2.0);
	
	var triangles = JSM.PolygonTriangulate2D (polygon2);
	test.Assert (JSM.CheckTriangulation2D (polygon2, triangles));
	test.Assert (triangles.length == 6);
	test.Assert (triangles[0].toString () == [1, 4, 0].toString ());
	test.Assert (triangles[1].toString () == [5, 0, 4].toString ());
	test.Assert (triangles[2].toString () == [2, 4, 1].toString ());
	test.Assert (triangles[3].toString () == [4, 2, 3].toString ());
	test.Assert (triangles[4].toString () == [6, 0, 5].toString ());
	test.Assert (triangles[5].toString () == [0, 6, 7].toString ());
	
	var polygon2cw = new JSM.Polygon2D ();
	polygon2cw.AddVertex (0.0, 0.0);
	polygon2cw.AddVertex (0.0, 2.0);
	polygon2cw.AddVertex (1.0, 2.0);
	polygon2cw.AddVertex (1.0, 1.0);
	polygon2cw.AddVertex (2.0, 1.0);
	polygon2cw.AddVertex (2.0, 2.0);
	polygon2cw.AddVertex (3.0, 2.0);
	polygon2cw.AddVertex (3.0, 0.0);
	
	var triangles = JSM.PolygonTriangulate2D (polygon2cw);
	test.Assert (JSM.CheckTriangulation2D (polygon2cw, triangles));
	test.Assert (triangles.length == 6);
	test.Assert (triangles[0].toString () == [6, 7, 5].toString ());
	test.Assert (triangles[1].toString () == [5, 7, 4].toString ());
	test.Assert (triangles[2].toString () == [4, 7, 3].toString ());
	test.Assert (triangles[3].toString () == [2, 3, 1].toString ());
	test.Assert (triangles[4].toString () == [1, 3, 0].toString ());
	test.Assert (triangles[5].toString () == [7, 0, 3].toString ());

	var polygon3 = new JSM.Polygon2D ();
	polygon3.AddVertex (0.0, 0.0);
	polygon3.AddVertex (5.0, 0.0);
	polygon3.AddVertex (5.0, 1.0);
	polygon3.AddVertex (1.0, 1.0);
	polygon3.AddVertex (1.0, 5.0);
	polygon3.AddVertex (4.0, 5.0);
	polygon3.AddVertex (4.0, 3.0);
	polygon3.AddVertex (3.0, 3.0);
	polygon3.AddVertex (3.0, 4.0);
	polygon3.AddVertex (2.0, 4.0);
	polygon3.AddVertex (2.0, 2.0);
	polygon3.AddVertex (5.0, 2.0);
	polygon3.AddVertex (5.0, 6.0);
	polygon3.AddVertex (0.0, 6.0);

	var triangles = JSM.PolygonTriangulate2D (polygon3);
	test.Assert (JSM.CheckTriangulation2D (polygon3, triangles));
	test.Assert (triangles.length == 12);
	test.Assert (triangles[0].toString () == [2, 0, 1].toString ());
	test.Assert (triangles[1].toString () == [3, 0, 2].toString ());
	test.Assert (triangles[2].toString () == [4, 0, 3].toString ());
	test.Assert (triangles[3].toString () == [5, 12, 4].toString ());
	test.Assert (triangles[4].toString () == [13, 4, 12].toString ());
	test.Assert (triangles[5].toString () == [4, 13, 0].toString ());
	test.Assert (triangles[6].toString () == [6, 12, 5].toString ());
	test.Assert (triangles[7].toString () == [7, 10, 6].toString ());
	test.Assert (triangles[8].toString () == [11, 6, 10].toString ());
	test.Assert (triangles[9].toString () == [6, 11, 12].toString ());
	test.Assert (triangles[10].toString () == [8, 10, 7].toString ());
	test.Assert (triangles[11].toString () == [10, 8, 9].toString ());

	var polygon4 = new JSM.Polygon2D ();
	polygon4.AddVertex (52, 221);
	polygon4.AddVertex (101, 89);
	polygon4.AddVertex (244, 89);
	polygon4.AddVertex (188, 222);
	polygon4.AddVertex (104, 219);
	polygon4.AddVertex (135, 139);
	polygon4.AddVertex (167, 140);
	polygon4.AddVertex (152, 189);
	polygon4.AddVertex (170, 189);
	polygon4.AddVertex (192, 118);
	polygon4.AddVertex (118, 121);
	polygon4.AddVertex (77, 223);
	
	var triangles = JSM.PolygonTriangulate2D (polygon4);
	test.Assert (JSM.CheckTriangulation2D (polygon4, triangles));
	test.Assert (triangles.length == 10);
});

AddTest ('PolygonTriangulationTest', function (test)
{
	var polygon = new JSM.Polygon ();
	polygon.AddVertex (0.0, 0.0, 0.0);
	polygon.AddVertex (3.0, 0.0, 0.0);
	polygon.AddVertex (3.0, 2.0, 0.0);
	polygon.AddVertex (1.5, 3.0, 0.0);
	polygon.AddVertex (0.0, 2.0, 0.0);
	
	var triangles = JSM.PolygonTriangulate (polygon);
	test.Assert (triangles.length == 3);
	test.Assert (triangles[0].toString () == [0, 1, 2].toString ());
	test.Assert (triangles[1].toString () == [0, 2, 3].toString ());
	test.Assert (triangles[2].toString () == [0, 3, 4].toString ());
});

AddTest ('PolygonOffsetTest', function (test)
{
	var polygon = new JSM.Polygon ();
	polygon.AddVertex (0.0, 0.0, 0.0);
	polygon.AddVertex (1.0, 0.0, 0.0);
	polygon.AddVertex (1.0, 1.0, 0.0);
	polygon.AddVertex (0.0, 1.0, 0.0);
	
	var offseted = JSM.OffsetPolygonContour (polygon, 0.2);
	test.Assert (JSM.CoordIsEqual (offseted.vertices[0], new JSM.Coord (0.2, 0.2, 0.0)));
	test.Assert (JSM.CoordIsEqual (offseted.vertices[1], new JSM.Coord (0.8, 0.2, 0.0)));
	test.Assert (JSM.CoordIsEqual (offseted.vertices[2], new JSM.Coord (0.8, 0.8, 0.0)));
	test.Assert (JSM.CoordIsEqual (offseted.vertices[3], new JSM.Coord (0.2, 0.8, 0.0)));

	var polygon = new JSM.Polygon ();
	polygon.AddVertex (0.0, 0.0, 0.0);
	polygon.AddVertex (2.0, 0.0, 0.0);
	polygon.AddVertex (2.0, 1.0, 0.0);
	polygon.AddVertex (1.0, 1.0, 0.0);
	polygon.AddVertex (1.0, 2.0, 0.0);
	
	var offseted = JSM.OffsetPolygonContour (polygon, 0.2);
	test.Assert (JSM.CoordIsEqual (offseted.vertices[0], new JSM.Coord (0.32360679774997897, 0.2, 0.0)));
	test.Assert (JSM.CoordIsEqual (offseted.vertices[1], new JSM.Coord (1.8, 0.2, 0.0)));
	test.Assert (JSM.CoordIsEqual (offseted.vertices[2], new JSM.Coord (1.8, 0.8, 0.0)));
	test.Assert (JSM.CoordIsEqual (offseted.vertices[3], new JSM.Coord (0.8, 0.8, 0.0)));
	test.Assert (JSM.CoordIsEqual (offseted.vertices[4], new JSM.Coord (0.8, 1.1527864045000422, 0.0)));
});

AddTest ('PlaneTest', function (test)
{
	var plane = new JSM.Plane (1.0, 2.0, 3.0, 4.0);
	test.Assert (plane.a == 1.0 && plane.b == 2.0 && plane.c == 3.0 && plane.d == 4.0);
	plane.Set (5.0, 6.0, 7.0, 8.0);
	test.Assert (plane.a == 5.0 && plane.b == 6.0 && plane.c == 7.0 && plane.d == 8.0);
	plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Vector (0.0, 0.0, 1.0));
	test.Assert (plane.a == 0.0 && plane.b == 0.0 && plane.c == 1.0 && plane.d == 0.0);
	plane = JSM.GetPlaneFromThreeCoords (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Vector (1.0, 0.0, 0.0), new JSM.Vector (0.0, 1.0, 0.0));
	test.Assert (plane.a == 0.0 && plane.b == 0.0 && plane.c == 1.0 && plane.d == 0.0);

	var coord1 = new JSM.Coord (0.0, 0.0, 0.0);
	var coord1b = new JSM.Coord (0.0, 0.0, 2.0);
	var coord2 = new JSM.Coord (1.0, 0.0, 0.0);
	var coord3 = new JSM.Coord (1.0, 1.0, 1.0);

	var plane1a = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Vector (0.0, 0.0, 1.0));
	var plane2a = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Vector (1.0, 0.0, 0.0));
	var plane3a = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (1.0, 1.0, 1.0), new JSM.Vector (0.0, 0.0, 1.0));
	
	var plane1b = JSM.GetPlaneFromThreeCoords (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Coord (1.0, 0.0, 0.0), new JSM.Coord (0.0, 1.0, 0.0));
	var plane2b = JSM.GetPlaneFromThreeCoords (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Coord (0.0, 1.0, 0.0), new JSM.Coord (0.0, 0.0, 1.0));
	var plane3b = JSM.GetPlaneFromThreeCoords (new JSM.Coord (1.0, 1.0, 1.0), new JSM.Coord (2.0, 1.0, 1.0), new JSM.Coord (1.0, 2.0, 1.0));
	
	var plane1, plane2, plane3;
	var i;
	for (i = 0; i < 2; i++) {
		if (i == 0) {
			plane1 = plane1a;
			plane2 = plane2a;
			plane3 = plane3a;
		} else if (i == 1) {
			plane1 = plane1b;
			plane2 = plane2b;
			plane3 = plane3b;
		}
	
		test.Assert (JSM.CoordPlanePosition (coord1, plane1) == 'CoordOnPlane');
		test.Assert (JSM.CoordPlanePosition (coord1, plane2) == 'CoordOnPlane');
		test.Assert (JSM.CoordPlanePosition (coord1b, plane3) == 'CoordInFrontOfPlane');
		test.Assert (JSM.CoordPlanePosition (coord1, plane3) == 'CoordAtBackOfPlane');

		test.Assert (JSM.IsEqual (JSM.CoordPlaneSignedDirectionalDistance (coord1, new JSM.Coord (1.0, 0.0, 0.0), plane1), 0.0));
		test.Assert (JSM.IsEqual (JSM.CoordPlaneSignedDirectionalDistance (coord1, new JSM.Coord (1.0, 0.0, 0.0), plane2), 0.0));
		test.Assert (JSM.IsEqual (JSM.CoordPlaneSignedDirectionalDistance (coord1, new JSM.Coord (0.0, 0.0, 1.0), plane3), -1.0));
		test.Assert (JSM.IsEqual (JSM.CoordPlaneSignedDirectionalDistance (coord1, new JSM.Coord (0.0, 1.0, 1.0), plane3), -1.4142135623));
		test.Assert (JSM.IsEqual (JSM.CoordPlaneSignedDirectionalDistance (coord1b, new JSM.Coord (0.0, 1.0, 1.0), plane3), 1.4142135623));
		test.Assert (JSM.IsEqual (JSM.CoordPlaneDirectionalDistance (coord1, new JSM.Coord (0.0, 1.0, 1.0), plane3), 1.4142135623));
		
		test.Assert (JSM.IsEqual (JSM.CoordPlaneDistance (coord1, plane1), 0.0));
		test.Assert (JSM.IsEqual (JSM.CoordPlaneDistance (coord1, plane2), 0.0));
		test.Assert (JSM.IsEqual (JSM.CoordPlaneDistance (coord1, plane3), 1.0));

		test.Assert (JSM.IsEqual (JSM.CoordPlaneDistance (coord2, plane1), 0.0));
		test.Assert (JSM.IsEqual (JSM.CoordPlaneDistance (coord2, plane2), 1.0));
		test.Assert (JSM.IsEqual (JSM.CoordPlaneDistance (coord2, plane3), 1.0));

		test.Assert (JSM.IsEqual (JSM.CoordPlaneDistance (coord3, plane1), 1.0));
		test.Assert (JSM.IsEqual (JSM.CoordPlaneDistance (coord3, plane2), 1.0));
		test.Assert (JSM.IsEqual (JSM.CoordPlaneDistance (coord3, plane3), 0.0));
		
		test.Assert (JSM.CoordIsEqual (JSM.ProjectCoordToPlane (coord1, plane1), new JSM.Coord (0.0, 0.0, 0.0)));
		test.Assert (JSM.CoordIsEqual (JSM.ProjectCoordToPlane (coord1, plane2), new JSM.Coord (0.0, 0.0, 0.0)));
		test.Assert (JSM.CoordIsEqual (JSM.ProjectCoordToPlane (coord1, plane3), new JSM.Coord (0.0, 0.0, 1.0)));

		test.Assert (JSM.CoordIsEqual (JSM.ProjectCoordToPlane (coord2, plane1), new JSM.Coord (1.0, 0.0, 0.0)));
		test.Assert (JSM.CoordIsEqual (JSM.ProjectCoordToPlane (coord2, plane2), new JSM.Coord (0.0, 0.0, 0.0)));
		test.Assert (JSM.CoordIsEqual (JSM.ProjectCoordToPlane (coord2, plane3), new JSM.Coord (1.0, 0.0, 1.0)));

		test.Assert (JSM.CoordIsEqual (JSM.ProjectCoordToPlane (coord3, plane1), new JSM.Coord (1.0, 1.0, 0.0)));
		test.Assert (JSM.CoordIsEqual (JSM.ProjectCoordToPlane (coord3, plane2), new JSM.Coord (0.0, 1.0, 1.0)));
		test.Assert (JSM.CoordIsEqual (JSM.ProjectCoordToPlane (coord3, plane3), new JSM.Coord (1.0, 1.0, 1.0)));
		
		var line1 = new JSM.Line (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Vector (1.0, 0.0, 0.0));
		var line2 = new JSM.Line (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Vector (0.0, 0.0, 1.0));
		var line3 = new JSM.Line (new JSM.Coord (1.0, 2.0, 3.0), new JSM.Vector (0.0, 0.0, 1.0));
		test.Assert (JSM.LinePlanePosition (line1, plane1) == 'LineParallelToPlane');
		test.Assert (JSM.LinePlanePosition (line2, plane1) == 'LineIntersectsPlane');
		
		var intersection = new JSM.Coord ();
		test.Assert (JSM.LinePlanePosition (line3, plane1, intersection) == 'LineIntersectsPlane');
		test.Assert (JSM.CoordIsEqual (intersection, new JSM.Coord (1.0, 2.0, 0.0)));
		test.Assert (JSM.CoordIsEqual (JSM.LinePlaneIntersection (line3, plane1), new JSM.Coord (1.0, 2.0, 0.0)));
	}
});

AddTest ('BodyTest', function (test)
{
	var body = new JSM.Body ();
	test.Assert (body.VertexCount () == 0 && body.PolygonCount () == 0);
	
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (0, 0, 0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (1, 0, 0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (0, 1, 0)));
	body.AddPolygon (new JSM.BodyPolygon ([0, 1, 2]));
	test.Assert (body.VertexCount () == 3 && body.PolygonCount () == 1);
	test.Assert (JSM.CoordIsEqual (body.GetVertex (0).position, new JSM.Coord (0, 0, 0)));
	test.Assert (JSM.CoordIsEqual (body.GetVertex (1).position, new JSM.Coord (1, 0, 0)));
	test.Assert (JSM.CoordIsEqual (body.GetVertex (2).position, new JSM.Coord (0, 1, 0)));
	test.Assert (body.GetPolygon (0).vertices.toString () == [0, 1, 2].toString ());
	
	polygonNormals = JSM.CalculateBodyPolygonNormals (body);
	test.Assert (polygonNormals.length == 1);
	test.Assert (JSM.CoordIsEqual (polygonNormals[0], new JSM.Vector (0, 0, 1)));

	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (0, 0, 1)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (0, 1, 1)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (1, 1, 1)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (1, 0, 1)));
	body.AddPolygon (new JSM.BodyPolygon ([3, 4, 5, 6]));
	
	polygonNormals = JSM.CalculateBodyPolygonNormals (body);
	test.Assert (body.VertexCount () == 7 && body.PolygonCount () == 2);
	test.Assert (body.GetPolygon (0).VertexIndexCount () == 3);
	test.Assert (body.GetPolygon (1).VertexIndexCount () == 4);
	test.Assert (polygonNormals.length == 2);
	test.Assert (JSM.CoordIsEqual (polygonNormals[0], new JSM.Vector (0, 0, 1)));
	test.Assert (JSM.CoordIsEqual (polygonNormals[1], new JSM.Vector (0, 0, -1)));

	body.AddPolygon (new JSM.BodyPolygon ([0, 1, 6]));
	polygonNormals = JSM.CalculateBodyPolygonNormals (body);
	test.Assert (polygonNormals.length == 3);
	test.Assert (JSM.CoordIsEqual (polygonNormals[2], new JSM.Vector (0, -1, 0)));
	
	test.Assert (JSM.CoordIsEqual (body.GetCenter (), new JSM.Coord (0.5, 0.5, 0.5)));
	
	body.Clear ();
	test.Assert (body.VertexCount () == 0 && body.PolygonCount () == 0);
});

AddTest ('ModelTest', function (test)
{
	var model = new JSM.Model ();
	model.AddBody (JSM.GenerateCuboid (1.0, 1.0, 1.0));
	model.AddBody (JSM.GenerateCuboid (1.0, 1.0, 1.0));
	test.Assert (model.BodyCount () == 2);
	test.Assert (model.GetBody (0).VertexCount () == 8);
	test.Assert (model.GetBody (1).VertexCount () == 8);
});

AddTest ('BodyVertexToPolygonTest', function (test)
{
	var body = new JSM.Body ();
	test.Assert (body.VertexCount () == 0 && body.PolygonCount () == 0);

	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (0, 0, 0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (1, 0, 0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (1, 1, 0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (0, 1, 0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (2, 0, 0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (2, 1, 0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (2, 2, 0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (0, 2, 0)));
	body.AddPolygon (new JSM.BodyPolygon ([0, 1, 2, 3]));
	body.AddPolygon (new JSM.BodyPolygon ([1, 4, 5, 2]));
	body.AddPolygon (new JSM.BodyPolygon ([2, 5, 6, 7, 3]));
	test.Assert (body.VertexCount () == 8 && body.PolygonCount () == 3);
	
	var vertexToPolygon = JSM.CalculateBodyVertexToPolygon (body);
	test.Assert (vertexToPolygon[0].toString () == [0].toString ());
	test.Assert (vertexToPolygon[1].toString () == [0, 1].toString ());
	test.Assert (vertexToPolygon[2].toString () == [0, 1, 2].toString ());
	test.Assert (vertexToPolygon[3].toString () == [0, 2].toString ());
	test.Assert (vertexToPolygon[4].toString () == [1].toString ());
	test.Assert (vertexToPolygon[5].toString () == [1, 2].toString ());
	test.Assert (vertexToPolygon[6].toString () == [2].toString ());
	test.Assert (vertexToPolygon[7].toString () == [2].toString ());

	body.Clear ();
	test.Assert (body.VertexCount () == 0 && body.PolygonCount () == 0);
});

AddTest ('BodyVertexNormalTest', function (test)
{
	var body = new JSM.Body ();
	test.Assert (body.VertexCount () == 0 && body.PolygonCount () == 0);

	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (0, 0, 0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (1, 0, 0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (1, 1, 0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (0, 1, 0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (1, 0, 1)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (1, 1, 1)));
	body.AddPolygon (new JSM.BodyPolygon ([0, 1, 2, 3]));
	body.AddPolygon (new JSM.BodyPolygon ([1, 2, 5, 4]));
	test.Assert (body.VertexCount () == 6 && body.PolygonCount () == 2);
	
	polygonNormals = JSM.CalculateBodyPolygonNormals (body);
	test.Assert (polygonNormals.length == 2);
	test.Assert (JSM.CoordIsEqual (polygonNormals[0], new JSM.Vector (0, 0, 1)));
	test.Assert (JSM.CoordIsEqual (polygonNormals[1], new JSM.Vector (1, 0, 0)));
	
	body.GetPolygon (0).SetCurveGroup (0);
	body.GetPolygon (1).SetCurveGroup (0);
	
	var vertexNormals = JSM.CalculateBodyVertexNormals (body);
	test.Assert (vertexNormals.length == 2);

	test.Assert (JSM.CoordIsEqual (vertexNormals[0][0], new JSM.Vector (0, 0, 1)));
	test.Assert (JSM.CoordIsEqual (vertexNormals[0][1], JSM.VectorNormalize (new JSM.Vector (1, 0, 1))));
	test.Assert (JSM.CoordIsEqual (vertexNormals[0][2], JSM.VectorNormalize (new JSM.Vector (1, 0, 1))));
	test.Assert (JSM.CoordIsEqual (vertexNormals[0][3], new JSM.Vector (0, 0, 1)));

	test.Assert (JSM.CoordIsEqual (vertexNormals[1][0], JSM.VectorNormalize (new JSM.Vector (1, 0, 1))));
	test.Assert (JSM.CoordIsEqual (vertexNormals[1][1], JSM.VectorNormalize (new JSM.Vector (1, 0, 1))));
	test.Assert (JSM.CoordIsEqual (vertexNormals[1][2], new JSM.Vector (1, 0, 0)));
	test.Assert (JSM.CoordIsEqual (vertexNormals[1][3], new JSM.Vector (1, 0, 0)));
});

AddTest ('BodyPlanarTextureCoordTest', function (test)
{
	var body = new JSM.Body ();
	
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (0.0, 0.0, 0.0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (1.0, 0.0, 0.0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (1.0, 0.0, 1.0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (0.0, 0.0, 1.0)));
	
	body.AddPolygon (new JSM.BodyPolygon ([0, 1, 2, 3]));

	body.SetTextureProjectionType ('Planar');
	body.SetTextureProjectionCoords (new JSM.CoordSystem (
		new JSM.Coord (0.0, 0.0, 0.0),
		new JSM.Coord (1.0, 0.0, 0.0),
		new JSM.Coord (0.0, 0.0, 1.0),
		new JSM.Coord (0.0, 0.0, 0.0)
	));
	
	var textureCoords = JSM.CalculateBodyTextureCoords (body);
	test.Assert (textureCoords.length == 1);
	test.Assert (textureCoords[0].length == 4);
	test.Assert (JSM.CoordIsEqual2D (textureCoords[0][0], new JSM.Coord2D (0, 0)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[0][1], new JSM.Coord2D (1, 0)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[0][2], new JSM.Coord2D (1, 1)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[0][3], new JSM.Coord2D (0, 1)));

	body.SetTextureProjectionCoords (new JSM.CoordSystem (
		new JSM.Coord (0.2, 0.0, 0.2),
		new JSM.Coord (0.0, 0.0, 1.0),
		new JSM.Coord (1.0, 0.0, 0.0),
		new JSM.Coord (0.0, 0.0, 0.0)
	));
	
	textureCoords = JSM.CalculateBodyTextureCoords (body);
	test.Assert (textureCoords.length == 1);
	test.Assert (textureCoords[0].length == 4);
	test.Assert (JSM.CoordIsEqual2D (textureCoords[0][0], new JSM.Coord2D (-0.2, -0.2)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[0][1], new JSM.Coord2D (-0.2, 0.8)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[0][2], new JSM.Coord2D (0.8, 0.8)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[0][3], new JSM.Coord2D (0.8, -0.2)));

	body.SetTextureProjectionCoords (new JSM.CoordSystem (
		new JSM.Coord (0.0, 0.0, 0.0),
		new JSM.Coord (1.0, 0.0, 0.0),
		new JSM.Coord (0.0, 0.0, 1.0),
		new JSM.Coord (0.0, 0.0, 0.0)
	));

	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (0.0, 1.0, 0.0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (0.0, 1.0, 1.0)));
	
	body.AddPolygon (new JSM.BodyPolygon ([0, 3, 5, 4]));

	textureCoords = JSM.CalculateBodyTextureCoords (body);
	test.Assert (textureCoords.length == 2);
	test.Assert (textureCoords[0].length == 4);
	test.Assert (textureCoords[1].length == 4);

	test.Assert (JSM.CoordIsEqual2D (textureCoords[0][0], new JSM.Coord2D (0, 0)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[0][1], new JSM.Coord2D (1, 0)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[0][2], new JSM.Coord2D (1, 1)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[0][3], new JSM.Coord2D (0, 1)));
	
	test.Assert (JSM.CoordIsEqual2D (textureCoords[1][0], new JSM.Coord2D (0, 0)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[1][1], new JSM.Coord2D (0, 1)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[1][2], new JSM.Coord2D (0, 1)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[1][3], new JSM.Coord2D (0, 0)));

	var body = new JSM.Body ();
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (0.0, 0.0, 0.0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (1.0, 0.0, 0.0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (1.0, 1.0, 0.0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (0.0, 1.0, 0.0)));
	
	body.AddPolygon (new JSM.BodyPolygon ([0, 1, 2, 3]));
	
	body.projection = 'Planar';
	body.coords = new JSM.CoordSystem (
		new JSM.Coord (0.0, 0.0, 0.0),
		new JSM.Coord (1.0, 0.0, 0.0),
		new JSM.Coord (0.0, 1.0, 0.0),
		new JSM.Coord (100.0, 200.0, 300.0)
	);

	textureCoords = JSM.CalculateBodyTextureCoords (body);
	test.Assert (textureCoords.length == 1);
	test.Assert (textureCoords[0].length == 4);
	
	test.Assert (JSM.CoordIsEqual2D (textureCoords[0][0], new JSM.Coord2D (0, 0)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[0][1], new JSM.Coord2D (1, 0)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[0][2], new JSM.Coord2D (1, 1)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[0][3], new JSM.Coord2D (0, 1)));

	body.projection = 'Planar';
	body.coords = new JSM.CoordSystem (
		new JSM.Coord (0.0, 0.0, 0.0),
		new JSM.Coord (10.0, 0.0, 0.0),
		new JSM.Coord (0.0, 20.0, 0.0),
		new JSM.Coord (100.0, 200.0, 300.0)
	);

	textureCoords = JSM.CalculateBodyTextureCoords (body);
	test.Assert (textureCoords.length == 1);
	test.Assert (textureCoords[0].length == 4);
	
	test.Assert (JSM.CoordIsEqual2D (textureCoords[0][0], new JSM.Coord2D (0, 0)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[0][1], new JSM.Coord2D (1, 0)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[0][2], new JSM.Coord2D (1, 1)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[0][3], new JSM.Coord2D (0, 1)));

	body.coords = new JSM.CoordSystem (
		new JSM.Coord (0.2, 0.2, 1.0),
		new JSM.Coord (1.0, 0.0, 0.0),
		new JSM.Coord (0.0, 1.0, 0.0),
		new JSM.Coord (100.0, 200.0, 300.0)
	);

	textureCoords = JSM.CalculateBodyTextureCoords (body);
	test.Assert (textureCoords.length == 1);
	test.Assert (textureCoords[0].length == 4);
	
	test.Assert (JSM.CoordIsEqual2D (textureCoords[0][0], new JSM.Coord2D (-0.2, -0.2)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[0][1], new JSM.Coord2D (0.8, -0.2)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[0][2], new JSM.Coord2D (0.8, 0.8)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[0][3], new JSM.Coord2D (-0.2, 0.8)));

	body.coords = new JSM.CoordSystem (
		new JSM.Coord (0.2, 0.3, 1.0),
		new JSM.Coord (1.0, 0.0, 0.0),
		new JSM.Coord (0.0, 1.0, 0.0),
		null
	);

	textureCoords = JSM.CalculateBodyTextureCoords (body);
	test.Assert (textureCoords.length == 1);
	test.Assert (textureCoords[0].length == 4);
	
	test.Assert (JSM.CoordIsEqual2D (textureCoords[0][0], new JSM.Coord2D (-0.2, -0.3)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[0][1], new JSM.Coord2D (0.8, -0.3)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[0][2], new JSM.Coord2D (0.8, 0.7)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[0][3], new JSM.Coord2D (-0.2, 0.7)));
});

AddTest ('BodyCubicTextureCoordTest', function (test)
{
	var body = new JSM.Body ();
	
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (0.0, 0.0, 0.0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (1.0, 0.0, 0.0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (1.0, 0.0, 1.0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (0.0, 0.0, 1.0)));
	
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (0.0, 1.0, 1.0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (0.0, 1.0, 0.0)));
	
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (1.0, 1.0, 1.0)));
	
	body.AddPolygon (new JSM.BodyPolygon ([0, 1, 2, 3]));
	body.AddPolygon (new JSM.BodyPolygon ([0, 3, 4, 5]));
	body.AddPolygon (new JSM.BodyPolygon ([3, 2, 6, 4]));
	
	body.SetTextureProjectionType ('Cubic');
	body.SetTextureProjectionCoords (new JSM.CoordSystem (
		new JSM.Coord (0.0, 0.0, 0.0),
		new JSM.Coord (1.0, 0.0, 0.0),
		new JSM.Coord (0.0, 1.0, 0.0),
		new JSM.Coord (0.0, 0.0, 1.0)
	));

	var textureCoords = JSM.CalculateBodyTextureCoords (body);
	test.Assert (textureCoords.length == 3);
	test.Assert (textureCoords[0].length == 4);
	test.Assert (textureCoords[1].length == 4);
	test.Assert (textureCoords[2].length == 4);
	
	test.Assert (JSM.CoordIsEqual2D (textureCoords[0][0], new JSM.Coord2D (0, 0)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[0][1], new JSM.Coord2D (1, 0)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[0][2], new JSM.Coord2D (1, 1)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[0][3], new JSM.Coord2D (0, 1)));
	
	test.Assert (JSM.CoordIsEqual2D (textureCoords[1][0], new JSM.Coord2D (0, 0)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[1][1], new JSM.Coord2D (0, 1)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[1][2], new JSM.Coord2D (1, 1)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[1][3], new JSM.Coord2D (1, 0)));

	test.Assert (JSM.CoordIsEqual2D (textureCoords[2][0], new JSM.Coord2D (0, 0)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[2][1], new JSM.Coord2D (1, 0)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[2][2], new JSM.Coord2D (1, 1)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[2][3], new JSM.Coord2D (0, 1)));

	body.SetTextureProjectionType ('Cubic');
	body.SetTextureProjectionCoords (new JSM.CoordSystem (
		new JSM.Coord (0.0, 0.0, 0.0),
		new JSM.Coord (10.0, 0.0, 0.0),
		new JSM.Coord (0.0, 20.0, 0.0),
		new JSM.Coord (0.0, 0.0, 30.0)
	));

	var textureCoords = JSM.CalculateBodyTextureCoords (body);
	test.Assert (textureCoords.length == 3);
	test.Assert (textureCoords[0].length == 4);
	test.Assert (textureCoords[1].length == 4);
	test.Assert (textureCoords[2].length == 4);
	
	test.Assert (JSM.CoordIsEqual2D (textureCoords[0][0], new JSM.Coord2D (0, 0)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[0][1], new JSM.Coord2D (1, 0)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[0][2], new JSM.Coord2D (1, 1)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[0][3], new JSM.Coord2D (0, 1)));
	
	test.Assert (JSM.CoordIsEqual2D (textureCoords[1][0], new JSM.Coord2D (0, 0)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[1][1], new JSM.Coord2D (0, 1)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[1][2], new JSM.Coord2D (1, 1)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[1][3], new JSM.Coord2D (1, 0)));

	test.Assert (JSM.CoordIsEqual2D (textureCoords[2][0], new JSM.Coord2D (0, 0)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[2][1], new JSM.Coord2D (1, 0)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[2][2], new JSM.Coord2D (1, 1)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[2][3], new JSM.Coord2D (0, 1)));
});

AddTest ('BodyCylindricalTextureCoordTest', function (test)
{
	var body = new JSM.GenerateCylinder (1.0, 1.0, 6.0, true, false);
	test.Assert (body.VertexCount () == 12);
	test.Assert (body.PolygonCount () == 8);
	
	var textureCoords = JSM.CalculateBodyTextureCoords (body);
	test.Assert (textureCoords.length == 8);
	test.Assert (textureCoords[0].length == 4);
	test.Assert (textureCoords[1].length == 4);
	test.Assert (textureCoords[2].length == 4);
	test.Assert (textureCoords[3].length == 4);
	test.Assert (textureCoords[4].length == 4);
	test.Assert (textureCoords[5].length == 4);
	
	var radius = 2.0 * Math.PI;
	test.Assert (JSM.CoordIsEqual2D (textureCoords[0][0], new JSM.Coord2D (radius, 1.0)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[0][1], new JSM.Coord2D (radius * 5.0 / 6.0, 1.0)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[0][2], new JSM.Coord2D (radius * 5.0 / 6.0, 0.0)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[0][3], new JSM.Coord2D (radius, 0.0)));

	test.Assert (JSM.CoordIsEqual2D (textureCoords[0][0], new JSM.Coord2D (radius * 6.0 / 6.0, 1.0)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[1][0], new JSM.Coord2D (radius * 5.0 / 6.0, 1.0)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[2][0], new JSM.Coord2D (radius * 4.0 / 6.0, 1.0)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[3][0], new JSM.Coord2D (radius * 3.0 / 6.0, 1.0)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[4][0], new JSM.Coord2D (radius * 2.0 / 6.0, 1.0)));
	test.Assert (JSM.CoordIsEqual2D (textureCoords[5][0], new JSM.Coord2D (radius * 1.0 / 6.0, 1.0)));
});

AddTest ('GenerateCuboidTest', function (test)
{
	var cuboid = JSM.GenerateCuboid (1, 2, 3);
	test.Assert (cuboid.VertexCount () == 8 && cuboid.PolygonCount () == 6);
	test.Assert (JSM.CheckSolidBody (cuboid));
	
	var vertexNormals = JSM.CalculateBodyVertexNormals (cuboid);
	test.Assert (JSM.CoordIsEqual (vertexNormals[0][0], JSM.VectorNormalize (new JSM.Vector (0, -1, 0))));
	test.Assert (JSM.CoordIsEqual (vertexNormals[0][1], JSM.VectorNormalize (new JSM.Vector (0, -1, 0))));
	test.Assert (JSM.CoordIsEqual (vertexNormals[0][2], JSM.VectorNormalize (new JSM.Vector (0, -1, 0))));
	test.Assert (JSM.CoordIsEqual (vertexNormals[0][3], JSM.VectorNormalize (new JSM.Vector (0, -1, 0))));

	test.Assert (JSM.CoordIsEqual (vertexNormals[5][0], JSM.VectorNormalize (new JSM.Vector (0, 0, 1))));
	test.Assert (JSM.CoordIsEqual (vertexNormals[5][1], JSM.VectorNormalize (new JSM.Vector (0, 0, 1))));
	test.Assert (JSM.CoordIsEqual (vertexNormals[5][2], JSM.VectorNormalize (new JSM.Vector (0, 0, 1))));
	test.Assert (JSM.CoordIsEqual (vertexNormals[5][3], JSM.VectorNormalize (new JSM.Vector (0, 0, 1))));
});

AddTest ('GenerateSphereTest', function (test)
{
	function VertexCountFromSegmentation (segmentation)
	{
		return (2 * segmentation) * (segmentation - 1) + 2;
	}

	function PolygonCountFromSegmentation (segmentation)
	{
		return (2 * segmentation) * segmentation;
	}

	var sphere = JSM.GenerateSphere (1.0, 3, true);
	test.Assert (sphere.VertexCount () == 14 && sphere.PolygonCount () == 18);
	test.Assert (JSM.CheckSolidBody (sphere));
	
	var sphere2 = JSM.GenerateSphere (1.0, 10, true);
	test.Assert (sphere2.VertexCount () == 182 && sphere2.PolygonCount () == 200);
	test.Assert (JSM.CheckSolidBody (sphere));
});

AddTest ('GenerateCylinderTest', function (test)
{
	var cylinder = JSM.GenerateCylinder (1.0, 2.0, 25, true, true);
	test.Assert (cylinder.VertexCount () == 50 && cylinder.PolygonCount () == 27);
	test.Assert (JSM.CheckSolidBody (cylinder));
	test.Assert (cylinder.GetPolygon (0).VertexIndexCount () == 4);
	test.Assert (cylinder.GetPolygon (25).VertexIndexCount () == 25);
	test.Assert (cylinder.GetPolygon (26).VertexIndexCount () == 25);

	var cylinder2 = JSM.GenerateCylinder (1.0, 2.0, 4, true, true);
	test.Assert (cylinder2.VertexCount () == 8 && cylinder2.PolygonCount () == 6);
	test.Assert (JSM.CheckSolidBody (cylinder2));
	test.Assert (cylinder2.GetPolygon (0).VertexIndexCount () == 4);
	test.Assert (cylinder2.GetPolygon (4).VertexIndexCount () == 4);
	test.Assert (cylinder2.GetPolygon (5).VertexIndexCount () == 4);
	
	var vertexNormals = JSM.CalculateBodyVertexNormals (cylinder2);
	test.Assert (JSM.CoordIsEqual (vertexNormals[0][0], JSM.VectorNormalize (new JSM.Vector (1, 0, 0))));
	test.Assert (JSM.CoordIsEqual (vertexNormals[0][1], JSM.VectorNormalize (new JSM.Vector (0, -1, 0))));
	test.Assert (JSM.CoordIsEqual (vertexNormals[0][2], JSM.VectorNormalize (new JSM.Vector (0, -1, 0))));
	test.Assert (JSM.CoordIsEqual (vertexNormals[0][3], JSM.VectorNormalize (new JSM.Vector (1, 0, 0))));

	test.Assert (JSM.CoordIsEqual (vertexNormals[1][0], JSM.VectorNormalize (new JSM.Vector (0, -1, 0))));
	test.Assert (JSM.CoordIsEqual (vertexNormals[1][1], JSM.VectorNormalize (new JSM.Vector (-1, 0, 0))));
	test.Assert (JSM.CoordIsEqual (vertexNormals[1][2], JSM.VectorNormalize (new JSM.Vector (-1, 0, 0))));
	test.Assert (JSM.CoordIsEqual (vertexNormals[1][3], JSM.VectorNormalize (new JSM.Vector (0, -1, 0))));
	
	test.Assert (JSM.CoordIsEqual (vertexNormals[4][0], JSM.VectorNormalize (new JSM.Vector (0, 0, 1))));
	test.Assert (JSM.CoordIsEqual (vertexNormals[4][1], JSM.VectorNormalize (new JSM.Vector (0, 0, 1))));
	test.Assert (JSM.CoordIsEqual (vertexNormals[4][2], JSM.VectorNormalize (new JSM.Vector (0, 0, 1))));
	test.Assert (JSM.CoordIsEqual (vertexNormals[4][3], JSM.VectorNormalize (new JSM.Vector (0, 0, 1))));
	
	test.Assert (JSM.CoordIsEqual (vertexNormals[5][0], JSM.VectorNormalize (new JSM.Vector (0, 0, -1))));
	test.Assert (JSM.CoordIsEqual (vertexNormals[5][1], JSM.VectorNormalize (new JSM.Vector (0, 0, -1))));
	test.Assert (JSM.CoordIsEqual (vertexNormals[5][2], JSM.VectorNormalize (new JSM.Vector (0, 0, -1))));
	test.Assert (JSM.CoordIsEqual (vertexNormals[5][3], JSM.VectorNormalize (new JSM.Vector (0, 0, -1))));
	
	var cylinder3 = JSM.GenerateCylinder (1.0, 2.0, 25, false, true);
	test.Assert (cylinder3.VertexCount () == 50 && cylinder3.PolygonCount () == 25);
	test.Assert (!JSM.IsSolidBody (cylinder3));
	test.Assert (!JSM.CheckSolidBody (cylinder3));
});

AddTest ('GeneratePieTest', function (test)
{
	var pie = JSM.GeneratePie (1.0, 2.0, 90.0 * JSM.DegRad, 25, true, true);
	test.Assert (pie.VertexCount () == 52 && pie.PolygonCount () == 28);
	test.Assert (JSM.CheckSolidBody (pie));
	test.Assert (pie.GetPolygon (0).VertexIndexCount () == 4);
	test.Assert (!pie.GetPolygon (0).HasCurveGroup ());
	test.Assert (pie.GetPolygon (1).HasCurveGroup ());
	test.Assert (pie.GetPolygon (25).VertexIndexCount () == 4);
	test.Assert (!pie.GetPolygon (25).HasCurveGroup ());
	test.Assert (pie.GetPolygon (26).VertexIndexCount () == 26);
	test.Assert (pie.GetPolygon (27).VertexIndexCount () == 26);
});

AddTest ('GenerateConeTest', function (test)
{
	var cone = JSM.GenerateCone (0.5, 1.0, 1.0, 25, true, true);
	test.Assert (cone.VertexCount () == 50 && cone.PolygonCount () == 27);
	test.Assert (JSM.CheckSolidBody (cone));
	test.Assert (cone.GetPolygon (0).VertexIndexCount () == 4);
	test.Assert (cone.GetPolygon (25).VertexIndexCount () == 25);
	test.Assert (cone.GetPolygon (26).VertexIndexCount () == 25);

	var cone2 = JSM.GenerateCone (0.5, 1.0, 1.0, 4, true, true);
	test.Assert (cone2.VertexCount () == 8 && cone2.PolygonCount () == 6);
	test.Assert (JSM.CheckSolidBody (cone2));
	test.Assert (cone2.GetPolygon (0).VertexIndexCount () == 4);
	test.Assert (cone2.GetPolygon (4).VertexIndexCount () == 4);
	test.Assert (cone2.GetPolygon (5).VertexIndexCount () == 4);
	
	var vertexNormals = JSM.CalculateBodyVertexNormals (cone2);
	test.Assert (JSM.CoordIsEqual (vertexNormals[0][0], JSM.VectorNormalize (new JSM.Vector (0.8944271909999159, 0, 0.4472135954999579))));
	test.Assert (JSM.CoordIsEqual (vertexNormals[0][1], JSM.VectorNormalize (new JSM.Vector (0, -0.8944271909999159, 0.4472135954999579))));
	test.Assert (JSM.CoordIsEqual (vertexNormals[0][2], JSM.VectorNormalize (new JSM.Vector (0, -0.8944271909999159, 0.4472135954999579))));
	test.Assert (JSM.CoordIsEqual (vertexNormals[0][3], JSM.VectorNormalize (new JSM.Vector (0.8944271909999159, 0, 0.4472135954999579))));
	
	test.Assert (JSM.CoordIsEqual (vertexNormals[4][0], JSM.VectorNormalize (new JSM.Vector (0, 0, 1))));
	test.Assert (JSM.CoordIsEqual (vertexNormals[4][1], JSM.VectorNormalize (new JSM.Vector (0, 0, 1))));
	test.Assert (JSM.CoordIsEqual (vertexNormals[4][2], JSM.VectorNormalize (new JSM.Vector (0, 0, 1))));
	test.Assert (JSM.CoordIsEqual (vertexNormals[4][3], JSM.VectorNormalize (new JSM.Vector (0, 0, 1))));
	
	test.Assert (JSM.CoordIsEqual (vertexNormals[5][0], JSM.VectorNormalize (new JSM.Vector (0, 0, -1))));
	test.Assert (JSM.CoordIsEqual (vertexNormals[5][1], JSM.VectorNormalize (new JSM.Vector (0, 0, -1))));
	test.Assert (JSM.CoordIsEqual (vertexNormals[5][2], JSM.VectorNormalize (new JSM.Vector (0, 0, -1))));
	test.Assert (JSM.CoordIsEqual (vertexNormals[5][3], JSM.VectorNormalize (new JSM.Vector (0, 0, -1))));
});

AddTest ('GeneratePrismTest', function (test)
{
	var basePoints = [
		new JSM.Coord (0.0, 0.0, 0.0),
		new JSM.Coord (1.0, 0.0, 0.0),
		new JSM.Coord (1.0, 1.0, 0.0),
		new JSM.Coord (0.5, 2.0, 0.0),
		new JSM.Coord (0.0, 1.0, 0.0)
	];
	
	var direction = new JSM.Vector (0.0, 0.0, 1.0);
	var prism = JSM.GeneratePrism (basePoints, direction, 1.0, true);
	test.Assert (prism.VertexCount () == 10 && prism.PolygonCount () == 7);
	test.Assert (JSM.CheckSolidBody (prism));
	test.Assert (JSM.CoordIsEqual (prism.GetVertex (0).position, new JSM.Vector (0.0, 0.0, 0.0)));
	test.Assert (JSM.CoordIsEqual (prism.GetVertex (1).position, new JSM.Vector (0.0, 0.0, 1.0)));

	var vertexNormals = JSM.CalculateBodyVertexNormals (prism);
	test.Assert (JSM.CoordIsEqual (vertexNormals[5][0], JSM.VectorNormalize (new JSM.Vector (0, 0, 1))));
	test.Assert (JSM.CoordIsEqual (vertexNormals[5][1], JSM.VectorNormalize (new JSM.Vector (0, 0, 1))));
	test.Assert (JSM.CoordIsEqual (vertexNormals[5][2], JSM.VectorNormalize (new JSM.Vector (0, 0, 1))));
	test.Assert (JSM.CoordIsEqual (vertexNormals[5][3], JSM.VectorNormalize (new JSM.Vector (0, 0, 1))));
	test.Assert (JSM.CoordIsEqual (vertexNormals[5][4], JSM.VectorNormalize (new JSM.Vector (0, 0, 1))));
	
	test.Assert (JSM.CoordIsEqual (vertexNormals[6][0], JSM.VectorNormalize (new JSM.Vector (0, 0, -1))));
	test.Assert (JSM.CoordIsEqual (vertexNormals[6][1], JSM.VectorNormalize (new JSM.Vector (0, 0, -1))));
	test.Assert (JSM.CoordIsEqual (vertexNormals[6][2], JSM.VectorNormalize (new JSM.Vector (0, 0, -1))));
	test.Assert (JSM.CoordIsEqual (vertexNormals[6][3], JSM.VectorNormalize (new JSM.Vector (0, 0, -1))));
	test.Assert (JSM.CoordIsEqual (vertexNormals[6][4], JSM.VectorNormalize (new JSM.Vector (0, 0, -1))));

	var basePoints2 = [
		new JSM.Coord (0.0, 0.0, 0.0),
		new JSM.Coord (1.0, 0.0, 0.0),
		new JSM.Coord (1.0, 1.0, 0.0),
		new JSM.Coord (0.5, 0.5, 0.0),
		new JSM.Coord (0.0, 1.0, 0.0)
	];
	
	var direction2 = new JSM.Vector (0.0, 0.0, 1.0);
	var prism2 = JSM.GeneratePrism (basePoints2, direction2, 1.0, true);
	test.Assert (JSM.CheckSolidBody (prism2));

	var vertexNormals = JSM.CalculateBodyVertexNormals (prism2);
	test.Assert (JSM.CoordIsEqual (vertexNormals[5][0], JSM.VectorNormalize (new JSM.Vector (0, 0, 1))));
	test.Assert (JSM.CoordIsEqual (vertexNormals[5][1], JSM.VectorNormalize (new JSM.Vector (0, 0, 1))));
	test.Assert (JSM.CoordIsEqual (vertexNormals[5][2], JSM.VectorNormalize (new JSM.Vector (0, 0, 1))));
	test.Assert (JSM.CoordIsEqual (vertexNormals[5][3], JSM.VectorNormalize (new JSM.Vector (0, 0, 1))));
	test.Assert (JSM.CoordIsEqual (vertexNormals[5][4], JSM.VectorNormalize (new JSM.Vector (0, 0, 1))));
	
	test.Assert (JSM.CoordIsEqual (vertexNormals[6][0], JSM.VectorNormalize (new JSM.Vector (0, 0, -1))));
	test.Assert (JSM.CoordIsEqual (vertexNormals[6][1], JSM.VectorNormalize (new JSM.Vector (0, 0, -1))));
	test.Assert (JSM.CoordIsEqual (vertexNormals[6][2], JSM.VectorNormalize (new JSM.Vector (0, 0, -1))));
	test.Assert (JSM.CoordIsEqual (vertexNormals[6][3], JSM.VectorNormalize (new JSM.Vector (0, 0, -1))));
	test.Assert (JSM.CoordIsEqual (vertexNormals[6][4], JSM.VectorNormalize (new JSM.Vector (0, 0, -1))));
});

AddTest ('GeneratePrismShellTest', function (test)
{
	var basePoints = [
		new JSM.Coord (0.0, 0.0, 0.0),
		new JSM.Coord (1.0, 0.0, 0.0),
		new JSM.Coord (1.0, 1.0, 0.0),
		new JSM.Coord (0.5, 2.0, 0.0),
		new JSM.Coord (0.0, 1.0, 0.0)
	];
	
	var direction = new JSM.Vector (0.0, 0.0, 1.0);
	var prism = JSM.GeneratePrismShell (basePoints, direction, 1.0, 0.1, true);
	test.Assert (prism.VertexCount () == 20 && prism.PolygonCount () == 20);
	test.Assert (JSM.CheckSolidBody (prism));
	test.Assert (JSM.CoordIsEqual (prism.GetVertex (0).position, new JSM.Vector (0.0, 0.0, 0.0)));
	test.Assert (JSM.CoordIsEqual (prism.GetVertex (10).position, new JSM.Vector (0.0, 0.0, 1.0)));
});

AddTest ('GenerateCylinderShellTest', function (test)
{
	var cylinder = JSM.GenerateCylinderShell (1, 1, 0.1, 10, true, false);
	test.Assert (cylinder.VertexCount () == 4 * 10 && cylinder.PolygonCount () == 4 * 10);
	test.Assert (JSM.CheckSolidBody (cylinder));
});

AddTest ('GenerateLineShellTest', function (test)
{
	var basePoints = [
		new JSM.Coord (0.0, 0.0, 0.0),
		new JSM.Coord (1.0, 0.0, 0.0),
		new JSM.Coord (1.0, 1.0, 0.0),
		new JSM.Coord (0.5, 2.0, 0.0),
		new JSM.Coord (0.0, 1.0, 0.0)
	];
	
	var direction = new JSM.Vector (0.0, 0.0, 1.0);
	var shell = JSM.GenerateLineShell (basePoints, direction, 1.0, 0.1, true, true);
	test.Assert (JSM.CheckSolidBody (shell));
	test.Assert (shell.VertexCount () == 20 && shell.PolygonCount () == 18);
	test.Assert (JSM.CoordIsEqual (shell.GetVertex (0).position, new JSM.Vector (0.0, 0.0, 0.0)));
	test.Assert (JSM.CoordIsEqual (shell.GetVertex (10).position, new JSM.Vector (0.0, 0.0, 1.0)));
});

AddTest ('GenerateTorusTest', function (test)
{
	var torus = JSM.GenerateTorus (1.0, 5.0, 10, 10, true);
	test.Assert (torus.VertexCount () == 100 && torus.PolygonCount () == 100);
	test.Assert (JSM.CheckSolidBody (torus));
});

AddTest ('GenerateRuledTest', function (test)
{
	var aCoords = [new JSM.Coord (0.0, 0.0, 0.0), new JSM.Coord (1.0, 0.0, 0.0), new JSM.Coord (2.0, 0.0, 0.0)];
	var bCoords = [new JSM.Coord (0.0, 2.0, 0.0), new JSM.Coord (1.0, 2.0, 0.0), new JSM.Coord (2.0, 2.0, 0.0)];
	var vertices = [];
	var polygons = [];
	
	JSM.GetRuledMesh (aCoords, bCoords, 2, vertices, polygons);
	test.Assert (vertices.length == 9);
	test.Assert (polygons.length == 4);
	test.Assert (JSM.CoordIsEqual (vertices[4], new JSM.Vector (1.0, 1.0, 0.0)));

	var ruledFromCoords = JSM.GenerateRuledFromCoords (aCoords, bCoords, 2);
	test.Assert (ruledFromCoords.VertexCount () == 9);
	test.Assert (ruledFromCoords.PolygonCount () == 4);
	test.Assert (JSM.CoordIsEqual (ruledFromCoords.GetVertex (4).position, new JSM.Vector (1.0, 1.0, 0.0)));
	
	var sector1 = new JSM.Sector (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Coord (2.0, 0.0, 0.0));
	var sector2 = new JSM.Sector (new JSM.Coord (0.0, 2.0, 0.0), new JSM.Coord (2.0, 2.0, 0.0));
	var sector1Coords = [];
	JSM.GetLineSegmentation (sector1.beg, sector1.end, 2, sector1Coords);
	test.Assert (sector1Coords.length == 3);
	test.Assert (JSM.CoordIsEqual (sector1Coords[0], new JSM.Vector (0.0, 0.0, 0.0)));
	test.Assert (JSM.CoordIsEqual (sector1Coords[1], new JSM.Vector (1.0, 0.0, 0.0)));
	test.Assert (JSM.CoordIsEqual (sector1Coords[2], new JSM.Vector (2.0, 0.0, 0.0)));
	
	var ruledFromSectors = JSM.GenerateRuledFromSectors (sector1, sector2, 2, 2, false);
	test.Assert (ruledFromSectors.VertexCount () == 9);
	test.Assert (ruledFromSectors.PolygonCount () == 4);
	test.Assert (JSM.CoordIsEqual (ruledFromSectors.GetVertex (4).position, new JSM.Vector (1.0, 1.0, 0.0)));

	var ruledFromSectors2 = JSM.GenerateRuledFromSectors (sector1, sector2, 10, 10, false);
	test.Assert (ruledFromSectors2.VertexCount () == 121);
	test.Assert (ruledFromSectors2.PolygonCount () == 100);
	test.Assert (JSM.CoordIsEqual (ruledFromSectors2.GetVertex (60).position, new JSM.Vector (1.0, 1.0, 0.0)));
});

AddTest ('GenerateRevolvedTest', function (test)
{
	var polyLine = [
		new JSM.Coord (0.5, 0.0, 0.0),
		new JSM.Coord (0.5, 0.0, 0.5)
	];
	var axis = new JSM.Sector (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Coord (0.0, 0.0, 1.0));
	var revolved = JSM.GenerateRevolved (polyLine, axis, 360.0 * JSM.DegRad, 10, true, false);
	test.Assert (revolved.VertexCount () == 20);
	test.Assert (revolved.PolygonCount () == 12);
	test.Assert (JSM.CheckSolidBody (revolved));

	var vertexNormals = JSM.CalculateBodyVertexNormals (revolved);
	test.Assert (JSM.CoordIsEqual (vertexNormals[10][0], new JSM.Vector (0.0, 0.0, 1.0)));
	test.Assert (JSM.CoordIsEqual (vertexNormals[11][0], new JSM.Vector (0.0, 0.0, -1.0)));
	
	var openRevolved = JSM.GenerateRevolved (polyLine, axis, 180.0 * JSM.DegRad, 10, true, false);
	test.Assert (openRevolved.VertexCount () == 22);
	test.Assert (openRevolved.PolygonCount () == 10);
	test.Assert (!JSM.IsSolidBody (openRevolved));
	test.Assert (!JSM.CheckSolidBody (openRevolved));
});

AddTest ('GenerateFunctionSurfaceTest', function (test)
{
	function TheFunction (x, y)
	{
		return x * x + y * y;
	}

	var intervalMin = new JSM.Coord2D (-1.0, -1.0);
	var intervalMax = new JSM.Coord2D (1.0, 1.0);
	var surface = JSM.GenerateFunctionSurface (TheFunction, intervalMin, intervalMax, 2, true);
	test.Assert (surface.VertexCount () == 9 && surface.PolygonCount () == 4);
	for (var i = 0; i < surface.VertexCount (); i++) {
		var coord = surface.GetVertex (i).position;
		test.Assert (JSM.IsEqual (coord.z, TheFunction (coord.x, coord.y)));
	}
});

AddTest ('SolidGeneratorTest', function (test)
{
	var ArePolygonsRegular = function (body)
	{
		var i, j, polygon, first, last, length, a, b, currentLength;
		for (i = 0; i < body.PolygonCount (); i++) {
			polygon = body.GetPolygon (i);
			first = body.GetVertex (polygon.GetVertexIndex (0));
			last = body.GetVertex (polygon.GetVertexIndex (polygon.VertexIndexCount () - 1));
			length = JSM.CoordDistance (first.position, last.position);
			for (j = 1; j < polygon.VertexIndexCount (); j++) {
				a = body.GetVertex (polygon.GetVertexIndex (j - 1));
				b = body.GetVertex (polygon.GetVertexIndex (j));
				currentLength = JSM.CoordDistance (a.position, b.position);
				if (!JSM.IsEqual (length, currentLength)) {
					return false;
				}
			}
		}
		return true;
	};

	var solid = null;

	solid = JSM.GenerateSolidWithRadius ('Tetrahedron', 1.0);
	test.Assert (solid.VertexCount () == 4 && solid.PolygonCount () == 4);
	test.Assert (ArePolygonsRegular (solid));
	test.Assert (JSM.CheckSolidBody (solid));

	solid = JSM.GenerateSolidWithRadius ('Hexahedron', 1.0);
	test.Assert (solid.VertexCount () == 8 && solid.PolygonCount () == 6);
	test.Assert (ArePolygonsRegular (solid));
	test.Assert (JSM.CheckSolidBody (solid));

	solid = JSM.GenerateSolidWithRadius ('Octahedron', 1.0);
	test.Assert (solid.VertexCount () == 6 && solid.PolygonCount () == 8);
	test.Assert (ArePolygonsRegular (solid));
	test.Assert (JSM.CheckSolidBody (solid));

	solid = JSM.GenerateSolidWithRadius ('Dodecahedron', 1.0);
	test.Assert (solid.VertexCount () == 20 && solid.PolygonCount () == 12);
	test.Assert (ArePolygonsRegular (solid));
	test.Assert (JSM.CheckSolidBody (solid));

	solid = JSM.GenerateSolidWithRadius ('Icosahedron', 1.0);
	test.Assert (solid.VertexCount () == 12 && solid.PolygonCount () == 20);
	test.Assert (ArePolygonsRegular (solid));
	test.Assert (JSM.CheckSolidBody (solid));

	solid = JSM.GenerateSolidWithRadius ('TruncatedTetrahedron', 1.0);
	test.Assert (solid.VertexCount () == 12 && solid.PolygonCount () == 8);
	test.Assert (ArePolygonsRegular (solid));
	test.Assert (JSM.CheckSolidBody (solid));

	solid = JSM.GenerateSolidWithRadius ('Cuboctahedron', 1.0);
	test.Assert (solid.VertexCount () == 12 && solid.PolygonCount () == 14);
	test.Assert (ArePolygonsRegular (solid));
	test.Assert (JSM.CheckSolidBody (solid));

	solid = JSM.GenerateSolidWithRadius ('TruncatedCube', 1.0);
	test.Assert (solid.VertexCount () == 24 && solid.PolygonCount () == 14);
	test.Assert (ArePolygonsRegular (solid));
	test.Assert (JSM.CheckSolidBody (solid));

	solid = JSM.GenerateSolidWithRadius ('TruncatedOctahedron', 1.0);
	test.Assert (solid.VertexCount () == 24 && solid.PolygonCount () == 14);
	test.Assert (ArePolygonsRegular (solid));
	test.Assert (JSM.CheckSolidBody (solid));

	solid = JSM.GenerateSolidWithRadius ('Rhombicuboctahedron', 1.0);
	test.Assert (solid.VertexCount () == 24 && solid.PolygonCount () == 26);
	test.Assert (ArePolygonsRegular (solid));
	test.Assert (JSM.CheckSolidBody (solid));

	solid = JSM.GenerateSolidWithRadius ('TruncatedCuboctahedron', 1.0);
	test.Assert (solid.VertexCount () == 48 && solid.PolygonCount () == 26);
	test.Assert (ArePolygonsRegular (solid));
	test.Assert (JSM.CheckSolidBody (solid));

	solid = JSM.GenerateSolidWithRadius ('SnubCube', 1.0);
	test.Assert (solid.VertexCount () == 24 && solid.PolygonCount () == 38);
	test.Assert (ArePolygonsRegular (solid));
	test.Assert (JSM.CheckSolidBody (solid));

	solid = JSM.GenerateSolidWithRadius ('Icosidodecahedron', 1.0);
	test.Assert (solid.VertexCount () == 30 && solid.PolygonCount () == 32);
	test.Assert (ArePolygonsRegular (solid));
	test.Assert (JSM.CheckSolidBody (solid));

	solid = JSM.GenerateSolidWithRadius ('TruncatedDodecahedron', 1.0);
	test.Assert (solid.VertexCount () == 60 && solid.PolygonCount () == 32);
	test.Assert (ArePolygonsRegular (solid));
	test.Assert (JSM.CheckSolidBody (solid));

	solid = JSM.GenerateSolidWithRadius ('TruncatedIcosahedron', 1.0);
	test.Assert (solid.VertexCount () == 60 && solid.PolygonCount () == 32);
	test.Assert (ArePolygonsRegular (solid));
	test.Assert (JSM.CheckSolidBody (solid));

	solid = JSM.GenerateSolidWithRadius ('Rhombicosidodecahedron', 1.0);
	test.Assert (solid.VertexCount () == 60 && solid.PolygonCount () == 62);
	test.Assert (ArePolygonsRegular (solid));
	test.Assert (JSM.CheckSolidBody (solid));

	solid = JSM.GenerateSolidWithRadius ('TruncatedIcosidodecahedron', 1.0);
	test.Assert (solid.VertexCount () == 120 && solid.PolygonCount () == 62);
	test.Assert (ArePolygonsRegular (solid));
	test.Assert (JSM.CheckSolidBody (solid));

	solid = JSM.GenerateSolidWithRadius ('SnubDodecahedron', 1.0);
	test.Assert (solid.VertexCount () == 60 && solid.PolygonCount () == 92);
	test.Assert (ArePolygonsRegular (solid));
	test.Assert (JSM.CheckSolidBody (solid));

	solid = JSM.GenerateSolidWithRadius ('SmallStellatedDodecahedron', 1.0);
	test.Assert (solid.VertexCount () == 32 && solid.PolygonCount () == 60);
	test.Assert (JSM.CheckSolidBody (solid));

	solid = JSM.GenerateSolidWithRadius ('GreatDodecahedron', 1.0);
	test.Assert (solid.VertexCount () == 32 && solid.PolygonCount () == 60);
	test.Assert (JSM.CheckSolidBody (solid));

	solid = JSM.GenerateSolidWithRadius ('GreatStellatedDodecahedron', 1.0);
	test.Assert (solid.VertexCount () == 32 && solid.PolygonCount () == 60);
	test.Assert (JSM.CheckSolidBody (solid));
});

AddTest ('CutTest', function (test)
{
	var polygon = [
		new JSM.Coord (0.0, 0.0, 0.0),
		new JSM.Coord (1.0, 0.0, 0.0),
		new JSM.Coord (1.0, 1.0, 0.0),
		new JSM.Coord (0.0, 1.0, 0.0)
	];

	var plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (2.0, 0.0, 0.0), new JSM.Vector (-1.0, 0.0, 0.0));
	var indexTable = [];
	var cutted = JSM.CutPolygonByPlane (polygon, plane, indexTable);

	test.Assert (cutted.length == 4);
	test.Assert (
		JSM.CoordIsEqual (cutted[0], new JSM.Vector (0.0, 0.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[1], new JSM.Vector (1.0, 0.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[2], new JSM.Vector (1.0, 1.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[3], new JSM.Vector (0.0, 1.0, 0.0))
		);
	test.Assert (indexTable.length == 4);
	test.Assert (
		indexTable[0] == 0 &&
		indexTable[1] == 1 &&
		indexTable[2] == 2 &&
		indexTable[3] == 3
		);

	plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (-1.0, 0.0, 0.0), new JSM.Vector (-1.0, 0.0, 0.0));
	indexTable = [];
	cutted = JSM.CutPolygonByPlane (polygon, plane, indexTable);
	test.Assert (cutted.length == 0);
	test.Assert (indexTable.length == 0);

	plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (0.5, 0.0, 0.0), new JSM.Vector (-1.0, 0.0, 0.0));
	indexTable = [];
	cutted = JSM.CutPolygonByPlane (polygon, plane, indexTable);
	test.Assert (cutted.length == 4);
	test.Assert (
		JSM.CoordIsEqual (cutted[0], new JSM.Vector (0.0, 0.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[1], new JSM.Vector (0.5, 0.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[2], new JSM.Vector (0.5, 1.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[3], new JSM.Vector (0.0, 1.0, 0.0))
		);
	test.Assert (indexTable.length == 4);
	test.Assert (
		indexTable[0] == 0 &&
		indexTable[1] == -1 &&
		indexTable[2] == -1 &&
		indexTable[3] == 3
		);		

	plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (0.5, 0.0, 0.0), new JSM.Vector (1.0, 0.0, 0.0));
	indexTable = [];
	cutted = JSM.CutPolygonByPlane (polygon, plane, indexTable);
	test.Assert (cutted.length == 4);
	test.Assert (
		JSM.CoordIsEqual (cutted[0], new JSM.Vector (0.5, 0.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[1], new JSM.Vector (1.0, 0.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[2], new JSM.Vector (1.0, 1.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[3], new JSM.Vector (0.5, 1.0, 0.0))
		);
	test.Assert (indexTable.length == 4);
	test.Assert (
		indexTable[0] == -1 &&
		indexTable[1] == 1 &&
		indexTable[2] == 2 &&
		indexTable[3] == -1
		);		

	plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (0.8, 0.0, 0.0), new JSM.Vector (-1.0, 0.0, 0.0));
	indexTable = [];
	cutted = JSM.CutPolygonByPlane (polygon, plane, indexTable);
	test.Assert (cutted.length == 4);	
	test.Assert (
		JSM.CoordIsEqual (cutted[0], new JSM.Vector (0.0, 0.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[1], new JSM.Vector (0.8, 0.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[2], new JSM.Vector (0.8, 1.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[3], new JSM.Vector (0.0, 1.0, 0.0))
		);
	test.Assert (indexTable.length == 4);
	test.Assert (
		indexTable[0] == 0 &&
		indexTable[1] == -1 &&
		indexTable[2] == -1 &&
		indexTable[3] == 3
		);		

	plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Vector (-1.0, 0.0, 0.0));
	indexTable = [];
	cutted = JSM.CutPolygonByPlane (polygon, plane, indexTable);
	test.Assert (cutted.length == 2);
	test.Assert (
		JSM.CoordIsEqual (cutted[0], new JSM.Vector (0.0, 0.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[1], new JSM.Vector (0.0, 1.0, 0.0))
		);
	test.Assert (indexTable.length == 2);
	test.Assert (
		indexTable[0] == 0 &&
		indexTable[1] == 3
		);

	plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Vector (-1.0, 1.0, 0.0));
	indexTable = [];
	cutted = JSM.CutPolygonByPlane (polygon, plane, indexTable);
	test.Assert (cutted.length == 3);
	test.Assert (
		JSM.CoordIsEqual (cutted[0], new JSM.Vector (0.0, 0.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[1], new JSM.Vector (1.0, 1.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[2], new JSM.Vector (0.0, 1.0, 0.0))
		);
	test.Assert (indexTable.length == 3);
	test.Assert (
		indexTable[0] == 0 &&
		indexTable[1] == 2 &&
		indexTable[2] == 3
		);

	polygon = [
		new JSM.Coord (-1.0, -1.0, 0.0),
		new JSM.Coord (-1.0, 1.0, 0.0),
		new JSM.Coord (1.0, 1.0, 0.0),
		new JSM.Coord (1.0, -1.0, 0.0)
	];

	plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Vector (-1.0, 0.0, 0.0));
	indexTable = [];
	cutted = JSM.CutPolygonByPlane (polygon, plane, indexTable);
	test.Assert (cutted.length == 4);
	test.Assert (
		JSM.CoordIsEqual (cutted[0], new JSM.Vector (0.0, -1.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[1], new JSM.Vector (-1.0, -1.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[2], new JSM.Vector (-1.0, 1.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[3], new JSM.Vector (0.0, 1.0, 0.0))
		);
	test.Assert (indexTable.length == 4);
	test.Assert (
		indexTable[0] == -1 &&
		indexTable[1] == 0 &&
		indexTable[2] == 1 &&
		indexTable[3] == -1
		);		

	plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (0.0, 0.0, 0.0), new JSM.Vector (1.0, 0.0, 0.0));
	indexTable = [];
	cutted = JSM.CutPolygonByPlane (polygon, plane, indexTable);
	test.Assert (cutted.length == 4);
	test.Assert (
		JSM.CoordIsEqual (cutted[0], new JSM.Vector (0.0, -1.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[1], new JSM.Vector (0.0, 1.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[2], new JSM.Vector (1.0, 1.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[3], new JSM.Vector (1.0, -1.0, 0.0))
		);
	test.Assert (indexTable.length == 4);
	test.Assert (
		indexTable[0] == -1 &&
		indexTable[1] == -1 &&
		indexTable[2] == 2 &&		
		indexTable[3] == 3
		);

	var polygon = [
		new JSM.Coord (0.0, 0.0, 0.0),
		new JSM.Coord (2.0, 0.0, 0.0),
		new JSM.Coord (2.0, 1.0, 0.0),
		new JSM.Coord (1.0, 1.0, 0.0),
		new JSM.Coord (1.0, 2.0, 0.0),
		new JSM.Coord (2.0, 2.0, 0.0),
		new JSM.Coord (2.0, 3.0, 0.0),
		new JSM.Coord (0.0, 3.0, 0.0)
	];

	plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (3.0, 0.0, 0.0), new JSM.Vector (-1.0, 0.0, 0.0));
	indexTable = [];
	cutted = JSM.CutPolygonByPlane (polygon, plane, indexTable);
	test.Assert (cutted.length == 8);
	test.Assert (
		JSM.CoordIsEqual (cutted[0], new JSM.Vector (0.0, 0.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[1], new JSM.Vector (2.0, 0.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[2], new JSM.Vector (2.0, 1.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[3], new JSM.Vector (1.0, 1.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[4], new JSM.Vector (1.0, 2.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[5], new JSM.Vector (2.0, 2.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[6], new JSM.Vector (2.0, 3.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[7], new JSM.Vector (0.0, 3.0, 0.0))
		);
	test.Assert (indexTable.length == 8);
	test.Assert (
		indexTable[0] == 0 &&
		indexTable[1] == 1 &&
		indexTable[2] == 2 &&
		indexTable[3] == 3 &&
		indexTable[4] == 4 &&
		indexTable[5] == 5 &&
		indexTable[6] == 6 &&
		indexTable[7] == 7
		);

	plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (1.5, 0.0, 0.0), new JSM.Vector (-1.0, 0.0, 0.0));
	indexTable = [];
	cutted = JSM.CutPolygonByPlane (polygon, plane, indexTable);
	test.Assert (cutted.length == 8);
	test.Assert (
		JSM.CoordIsEqual (cutted[0], new JSM.Vector (0.0, 0.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[1], new JSM.Vector (1.5, 0.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[2], new JSM.Vector (1.5, 1.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[3], new JSM.Vector (1.0, 1.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[4], new JSM.Vector (1.0, 2.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[5], new JSM.Vector (1.5, 2.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[6], new JSM.Vector (1.5, 3.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[7], new JSM.Vector (0.0, 3.0, 0.0))
		);
	test.Assert (indexTable.length == 8);
	test.Assert (
		indexTable[0] == 0 &&
		indexTable[1] == -1 &&
		indexTable[2] == -1 &&
		indexTable[3] == 3 &&
		indexTable[4] == 4 &&
		indexTable[5] == -1 &&
		indexTable[6] == -1 &&
		indexTable[7] == 7
		);

	plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (0.5, 0.0, 0.0), new JSM.Vector (-1.0, 0.0, 0.0));
	indexTable = [];
	cutted = JSM.CutPolygonByPlane (polygon, plane, indexTable);
	test.Assert (cutted.length == 4);
	test.Assert (
		JSM.CoordIsEqual (cutted[0], new JSM.Vector (0.0, 0.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[1], new JSM.Vector (0.5, 0.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[2], new JSM.Vector (0.5, 3.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[3], new JSM.Vector (0.0, 3.0, 0.0))
		);
	test.Assert (indexTable.length == 4);
	test.Assert (
		indexTable[0] == 0 &&
		indexTable[1] == -1 &&
		indexTable[2] == -1 &&
		indexTable[3] == 7
		);

	plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (1.0, 0.0, 0.0), new JSM.Vector (-1.0, 0.0, 0.0));
	indexTable = [];
	cutted = JSM.CutPolygonByPlane (polygon, plane, indexTable);
	test.Assert (cutted.length == 6);
	test.Assert (
		JSM.CoordIsEqual (cutted[0], new JSM.Vector (0.0, 0.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[1], new JSM.Vector (1.0, 0.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[2], new JSM.Vector (1.0, 1.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[3], new JSM.Vector (1.0, 2.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[4], new JSM.Vector (1.0, 3.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[5], new JSM.Vector (0.0, 3.0, 0.0))
		);
	test.Assert (indexTable.length == 6);
	test.Assert (
		indexTable[0] == 0 &&
		indexTable[1] == -1 &&
		indexTable[2] == 3 &&
		indexTable[3] == 4 &&
		indexTable[4] == -1 &&
		indexTable[5] == 7
		);

	plane = JSM.GetPlaneFromCoordAndDirection (new JSM.Coord (1.5, 0.0, 0.0), new JSM.Vector (1.0, 0.0, 0.0));
	indexTable = [];
	cutted = JSM.CutPolygonByPlane (polygon, plane, indexTable);
	test.Assert (cutted.length == 8);
	test.Assert (
		JSM.CoordIsEqual (cutted[0], new JSM.Vector (1.5, 0.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[1], new JSM.Vector (2.0, 0.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[2], new JSM.Vector (2.0, 1.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[3], new JSM.Vector (1.5, 1.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[4], new JSM.Vector (1.5, 2.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[5], new JSM.Vector (2.0, 2.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[6], new JSM.Vector (2.0, 3.0, 0.0)) &&
		JSM.CoordIsEqual (cutted[7], new JSM.Vector (1.5, 3.0, 0.0))
		);
	test.Assert (indexTable.length == 8);
	test.Assert (
		indexTable[0] == -1 &&
		indexTable[1] == 1 &&
		indexTable[2] == 2 &&
		indexTable[3] == -1 &&
		indexTable[4] == -1 &&
		indexTable[5] == 5 &&
		indexTable[6] == 6 &&
		indexTable[7] == -1
		);
});

AddTest ('AdjacencyListTest', function (test)
{
	var EqualEdge = function (e1, e2)
	{
		return e1.index == e2[0] && e1.reverse == e2[1];
	};

	var cube = JSM.GenerateCuboid (1, 1, 1);
	test.Assert (JSM.CheckSolidBody (cube));
	var al = JSM.CalculateAdjacencyList (cube);
/*
		 7__9__6
		/|    /|
	  11 8   6 |
	  /  |  /  5
	3/_2_|_/2  |
	 |  4|_|_7_|5
	 3  /  |  /
	 | 10  1 4
	 |/_0__|/
	 0     1

	result.AddVertex (new JSM.BodyVertex (new JSM.Coord (-x, -y, -z)));
	result.AddVertex (new JSM.BodyVertex (new JSM.Coord (x, -y, -z)));
	result.AddVertex (new JSM.BodyVertex (new JSM.Coord (x, -y, z)));
	result.AddVertex (new JSM.BodyVertex (new JSM.Coord (-x, -y, z)));
	result.AddVertex (new JSM.BodyVertex (new JSM.Coord (-x, y, -z)));
	result.AddVertex (new JSM.BodyVertex (new JSM.Coord (x, y, -z)));
	result.AddVertex (new JSM.BodyVertex (new JSM.Coord (x, y, z)));
	result.AddVertex (new JSM.BodyVertex (new JSM.Coord (-x, y, z)));

	result.AddPolygon (new JSM.BodyPolygon ([0, 1, 2, 3]));
	result.AddPolygon (new JSM.BodyPolygon ([1, 5, 6, 2]));
	result.AddPolygon (new JSM.BodyPolygon ([5, 4, 7, 6]));
	result.AddPolygon (new JSM.BodyPolygon ([4, 0, 3, 7]));
	result.AddPolygon (new JSM.BodyPolygon ([0, 4, 5, 1]));
	result.AddPolygon (new JSM.BodyPolygon ([3, 2, 6, 7]));
*/			
	test.Assert (al.verts.length == 8);
	
	test.Assert (al.verts[0].pgons.length == 3);
	test.Assert (al.verts[1].pgons.length == 3);
	test.Assert (al.verts[2].pgons.length == 3);
	test.Assert (al.verts[3].pgons.length == 3);
	test.Assert (al.verts[4].pgons.length == 3);
	test.Assert (al.verts[5].pgons.length == 3);
	test.Assert (al.verts[6].pgons.length == 3);
	test.Assert (al.verts[7].pgons.length == 3);
	
	test.Assert (al.verts[0].pgons[0] == 0 && al.verts[0].pgons[1] == 3 && al.verts[0].pgons[2] == 4);
	test.Assert (al.verts[1].pgons[0] == 0 && al.verts[1].pgons[1] == 1 && al.verts[1].pgons[2] == 4);
	test.Assert (al.verts[2].pgons[0] == 0 && al.verts[2].pgons[1] == 1 && al.verts[2].pgons[2] == 5);
	test.Assert (al.verts[3].pgons[0] == 0 && al.verts[3].pgons[1] == 3 && al.verts[3].pgons[2] == 5);
	test.Assert (al.verts[4].pgons[0] == 2 && al.verts[4].pgons[1] == 3 && al.verts[4].pgons[2] == 4);
	test.Assert (al.verts[5].pgons[0] == 1 && al.verts[5].pgons[1] == 2 && al.verts[5].pgons[2] == 4);
	test.Assert (al.verts[6].pgons[0] == 1 && al.verts[6].pgons[1] == 2 && al.verts[6].pgons[2] == 5);
	test.Assert (al.verts[7].pgons[0] == 2 && al.verts[7].pgons[1] == 3 && al.verts[7].pgons[2] == 5);

	test.Assert (al.verts[0].edges.length == 3);
	test.Assert (al.verts[1].edges.length == 3);
	test.Assert (al.verts[2].edges.length == 3);
	test.Assert (al.verts[3].edges.length == 3);
	test.Assert (al.verts[4].edges.length == 3);
	test.Assert (al.verts[5].edges.length == 3);
	test.Assert (al.verts[6].edges.length == 3);
	test.Assert (al.verts[7].edges.length == 3);
	
	test.Assert (al.verts[0].edges[0] == 0 && al.verts[0].edges[1] == 3 && al.verts[0].edges[2] == 10);
	test.Assert (al.verts[1].edges[0] == 1 && al.verts[1].edges[1] == 4 && al.verts[1].edges[2] == 0);
	test.Assert (al.verts[2].edges[0] == 2 && al.verts[2].edges[1] == 1 && al.verts[2].edges[2] == 6);
	test.Assert (al.verts[3].edges[0] == 3 && al.verts[3].edges[1] == 11 && al.verts[3].edges[2] == 2);
	test.Assert (al.verts[4].edges[0] == 8 && al.verts[4].edges[1] == 10 && al.verts[4].edges[2] == 7);
	test.Assert (al.verts[5].edges[0] == 5 && al.verts[5].edges[1] == 7 && al.verts[5].edges[2] == 4);
	test.Assert (al.verts[6].edges[0] == 6 && al.verts[6].edges[1] == 5 && al.verts[6].edges[2] == 9);
	test.Assert (al.verts[7].edges[0] == 9 && al.verts[7].edges[1] == 8 && al.verts[7].edges[2] == 11);

	test.Assert (al.edges.length == 12);
	
	test.Assert (al.edges[0].vert1 == 0 && al.edges[0].vert2 == 1);
	test.Assert (al.edges[1].vert1 == 1 && al.edges[1].vert2 == 2);
	test.Assert (al.edges[2].vert1 == 2 && al.edges[2].vert2 == 3);
	test.Assert (al.edges[3].vert1 == 3 && al.edges[3].vert2 == 0);
	test.Assert (al.edges[4].vert1 == 1 && al.edges[4].vert2 == 5);
	test.Assert (al.edges[5].vert1 == 5 && al.edges[5].vert2 == 6);
	test.Assert (al.edges[6].vert1 == 6 && al.edges[6].vert2 == 2);
	test.Assert (al.edges[7].vert1 == 5 && al.edges[7].vert2 == 4);
	test.Assert (al.edges[8].vert1 == 4 && al.edges[8].vert2 == 7);
	test.Assert (al.edges[9].vert1 == 7 && al.edges[9].vert2 == 6);
	test.Assert (al.edges[10].vert1 == 4 && al.edges[10].vert2 == 0);
	test.Assert (al.edges[11].vert1 == 3 && al.edges[11].vert2 == 7);
	
	test.Assert (al.edges[0].pgon1 == 0 && al.edges[0].pgon2 == 4);
	test.Assert (al.edges[1].pgon1 == 0 && al.edges[1].pgon2 == 1);
	test.Assert (al.edges[2].pgon1 == 0 && al.edges[2].pgon2 == 5);
	test.Assert (al.edges[3].pgon1 == 0 && al.edges[3].pgon2 == 3);
	test.Assert (al.edges[4].pgon1 == 1 && al.edges[4].pgon2 == 4);
	test.Assert (al.edges[5].pgon1 == 1 && al.edges[5].pgon2 == 2);
	test.Assert (al.edges[6].pgon1 == 1 && al.edges[6].pgon2 == 5);
	test.Assert (al.edges[7].pgon1 == 2 && al.edges[7].pgon2 == 4);
	test.Assert (al.edges[8].pgon1 == 2 && al.edges[8].pgon2 == 3);
	test.Assert (al.edges[9].pgon1 == 2 && al.edges[9].pgon2 == 5);
	test.Assert (al.edges[10].pgon1 == 3 && al.edges[10].pgon2 == 4);
	test.Assert (al.edges[11].pgon1 == 3 && al.edges[11].pgon2 == 5);

	test.Assert (al.pgons.length == 6);
	test.Assert (al.pgons[0].verts.length == 4);
	test.Assert (al.pgons[1].verts.length == 4);
	test.Assert (al.pgons[2].verts.length == 4);
	test.Assert (al.pgons[3].verts.length == 4);
	test.Assert (al.pgons[4].verts.length == 4);
	test.Assert (al.pgons[5].verts.length == 4);

	test.Assert (al.pgons[0].verts[0] == 0 && al.pgons[0].verts[1] == 1 && al.pgons[0].verts[2] == 2 && al.pgons[0].verts[3] == 3);
	test.Assert (al.pgons[1].verts[0] == 1 && al.pgons[1].verts[1] == 5 && al.pgons[1].verts[2] == 6 && al.pgons[1].verts[3] == 2);
	test.Assert (al.pgons[2].verts[0] == 5 && al.pgons[2].verts[1] == 4 && al.pgons[2].verts[2] == 7 && al.pgons[2].verts[3] == 6);
	test.Assert (al.pgons[3].verts[0] == 4 && al.pgons[3].verts[1] == 0 && al.pgons[3].verts[2] == 3 && al.pgons[3].verts[3] == 7);
	test.Assert (al.pgons[4].verts[0] == 0 && al.pgons[4].verts[1] == 4 && al.pgons[4].verts[2] == 5 && al.pgons[4].verts[3] == 1);
	test.Assert (al.pgons[5].verts[0] == 3 && al.pgons[5].verts[1] == 2 && al.pgons[5].verts[2] == 6 && al.pgons[5].verts[3] == 7);

	test.Assert (al.pgons[0].pedges.length == 4);
	test.Assert (al.pgons[1].pedges.length == 4);
	test.Assert (al.pgons[2].pedges.length == 4);
	test.Assert (al.pgons[3].pedges.length == 4);
	test.Assert (al.pgons[4].pedges.length == 4);
	test.Assert (al.pgons[5].pedges.length == 4);

	test.Assert (EqualEdge (al.pgons[0].pedges[0], [0, false]) && EqualEdge (al.pgons[0].pedges[1], [1, false]) && EqualEdge (al.pgons[0].pedges[2], [2, false]) && EqualEdge (al.pgons[0].pedges[3], [3, false]));
	test.Assert (EqualEdge (al.pgons[1].pedges[0], [4, false]) && EqualEdge (al.pgons[1].pedges[1], [5, false]) && EqualEdge (al.pgons[1].pedges[2], [6, false]) && EqualEdge (al.pgons[1].pedges[3], [1, true]));
	test.Assert (EqualEdge (al.pgons[2].pedges[0], [7, false]) && EqualEdge (al.pgons[2].pedges[1], [8, false]) && EqualEdge (al.pgons[2].pedges[2], [9, false]) && EqualEdge (al.pgons[2].pedges[3], [5, true]));
	test.Assert (EqualEdge (al.pgons[3].pedges[0], [10, false]) && EqualEdge (al.pgons[3].pedges[1], [3, true]) && EqualEdge (al.pgons[3].pedges[2], [11, false]) && EqualEdge (al.pgons[3].pedges[3], [8, true]));
	test.Assert (EqualEdge (al.pgons[4].pedges[0], [10, true]) && EqualEdge (al.pgons[4].pedges[1], [7, true]) && EqualEdge (al.pgons[4].pedges[2], [4, true]) && EqualEdge (al.pgons[4].pedges[3], [0, true]));
	test.Assert (EqualEdge (al.pgons[5].pedges[0], [2, true]) && EqualEdge (al.pgons[5].pedges[1], [6, true]) && EqualEdge (al.pgons[5].pedges[2], [9, true]) && EqualEdge (al.pgons[5].pedges[3], [11, true]));
});

AddTest ('SubdivisionTest', function (test)
{
	var body = JSM.GenerateCuboid (1, 1, 1);
	test.Assert (JSM.CheckSolidBody (body));
	test.Assert (body.VertexCount () == 8);
	test.Assert (body.PolygonCount () == 6);

	body = JSM.CatmullClarkSubdivision (body, 1);
	test.Assert (JSM.CheckSolidBody (body));
	test.Assert (body.VertexCount () == 26);
	test.Assert (body.PolygonCount () == 24);

	body = JSM.CatmullClarkSubdivision (body, 1);
	test.Assert (JSM.CheckSolidBody (body));
	test.Assert (body.VertexCount () == 98);
	test.Assert (body.PolygonCount () == 96);
});

AddTest ('ProjectionTest', function (test)
{
	var eye = new JSM.Coord (1, 0, 0);
	var center = new JSM.Coord (0, 0, 0);
	var up = new JSM.Coord (0, 0, 1);
	var width = 200;
	var height = 100;
	var fieldOfView = 45.0;
	var aspectRatio = width / height;
	var nearPlane = 0.1;
	var farPlane = 100;
	var viewPort = [0, 0, width, height];

	var projected = new JSM.Coord ();
	var succeeded = false;

	succeeded = JSM.Project (new JSM.Coord (0, 0, 0), eye, center, up, fieldOfView, aspectRatio, nearPlane, farPlane, viewPort, projected);
	test.Assert (succeeded == true);
	test.Assert (JSM.IsEqual (projected.x, 100) && JSM.IsEqual (projected.y, 50));

	succeeded = JSM.Project (new JSM.Coord (0.5, 0, 0), eye, center, up, fieldOfView, aspectRatio, nearPlane, farPlane, viewPort, projected);
	test.Assert (succeeded == true);
	test.Assert (JSM.IsEqual (projected.x, 100) && JSM.IsEqual (projected.y, 50));

	succeeded = JSM.Project (new JSM.Coord (1.5, 0, 0), eye, center, up, fieldOfView, aspectRatio, nearPlane, farPlane, viewPort, projected);
	test.Assert (succeeded == true);
	test.Assert (JSM.IsEqual (projected.x, 100) && JSM.IsEqual (projected.y, 50));

	succeeded = JSM.Project (new JSM.Coord (100, 0, 0), eye, center, up, fieldOfView, aspectRatio, nearPlane, farPlane, viewPort, projected);
	test.Assert (succeeded == true);
	test.Assert (JSM.IsEqual (projected.x, 100) && JSM.IsEqual (projected.y, 50));

	succeeded = JSM.Project (new JSM.Coord (-100, 0, 0), eye, center, up, fieldOfView, aspectRatio, nearPlane, farPlane, viewPort, projected);
	test.Assert (succeeded == true);
	test.Assert (JSM.IsEqual (projected.x, 100) && JSM.IsEqual (projected.y, 50));

	succeeded = JSM.Project (new JSM.Coord (1, 0, 0), eye, center, up, fieldOfView, aspectRatio, nearPlane, farPlane, viewPort, projected);
	test.Assert (succeeded == false);

	succeeded = JSM.Project (new JSM.Coord (0, 0.5, 0), eye, center, up, fieldOfView, aspectRatio, nearPlane, farPlane, viewPort, projected);
	test.Assert (succeeded == true);
	test.Assert (JSM.IsEqual (projected.x, 189.62954934596522) && JSM.IsEqual (projected.y, 50));

	succeeded = JSM.Project (new JSM.Coord (0, 0, 0.5), eye, center, up, fieldOfView, aspectRatio, nearPlane, farPlane, viewPort, projected);
	test.Assert (succeeded == true);
	test.Assert (JSM.IsEqual (projected.x, 100) && JSM.IsEqual (projected.y, 139.62954934596522));

	succeeded = JSM.Project (new JSM.Coord (0, 0.5, 0.5), eye, center, up, fieldOfView, aspectRatio, nearPlane, farPlane, viewPort, projected);
	test.Assert (succeeded == true);
	test.Assert (JSM.IsEqual (projected.x, 189.62954934596522) && JSM.IsEqual (projected.y, 139.62954934596522));
});

AddTest ('ExportTest', function (test)
{
	var gdl1Ref = "base\nvert 0, 0, 0 ! 1\nvert 1, 0, 0 ! 2\nvert 0, 1, 0 ! 3\nedge 1, 2, -1, -1, 0 ! 1\nedge 2, 3, -1, -1, 0 ! 2\nedge 3, 1, -1, -1, 0 ! 3\npgon 3, 0, 0, 1, 2, 3 ! 1\nbody -1\n";
	var gdl2Ref = "base\nvert 0, 0, 1 ! 1\nvert 1, 0, 1 ! 2\nvert 0, 1, 1 ! 3\nedge 1, 2, -1, -1, 0 ! 1\nedge 2, 3, -1, -1, 0 ! 2\nedge 3, 1, -1, -1, 0 ! 3\npgon 3, 0, 0, 1, 2, 3 ! 1\nbody -1\n";
	var gdlMatHeader = "define material \"material1\" 2, 0,0.8,0 ! 1\ndefine material \"material2\" 2, 0.8,0,0 ! 2\n";
	var gdlGeom1Ref = "base\nvert 0, 0, 0 ! 1\nvert 1, 0, 0 ! 2\nvert 0, 1, 0 ! 3\nedge 1, 2, -1, -1, 0 ! 1\nedge 2, 3, -1, -1, 0 ! 2\nedge 3, 1, -1, -1, 0 ! 3\nset material \"material1\"\npgon 3, 0, 0, 1, 2, 3 ! 1\nbody -1\n";
	var gdlGeom2Ref = "base\nvert 0, 0, 1 ! 1\nvert 1, 0, 1 ! 2\nvert 0, 1, 1 ! 3\nedge 1, 2, -1, -1, 0 ! 1\nedge 2, 3, -1, -1, 0 ! 2\nedge 3, 1, -1, -1, 0 ! 3\nset material \"material2\"\npgon 3, 0, 0, 1, 2, 3 ! 1\nbody -1\n";
	var stl1Ref = "solid Body1\n\tfacet normal 0 0 1\n\t\touter loop\n\t\t\tvertex 0 0 0\n\t\t\tvertex 1 0 0\n\t\t\tvertex 0 1 0\n\t\tendloop\n\tendfacet\nendsolid Body1\n";
	var stl2Ref = "solid Body2\n\tfacet normal 0 0 1\n\t\touter loop\n\t\t\tvertex 0 0 1\n\t\t\tvertex 1 0 1\n\t\t\tvertex 0 1 1\n\t\tendloop\n\tendfacet\nendsolid Body2\n";
	var modelStlRef = "solid Model\n\tfacet normal 0 0 1\n\t\touter loop\n\t\t\tvertex 0 0 0\n\t\t\tvertex 1 0 0\n\t\t\tvertex 0 1 0\n\t\tendloop\n\tendfacet\n\tfacet normal 0 0 1\n\t\touter loop\n\t\t\tvertex 0 0 1\n\t\t\tvertex 1 0 1\n\t\t\tvertex 0 1 1\n\t\tendloop\n\tendfacet\nendsolid Model\n";
	var obj1Ref = "v 0 0 0\nv 1 0 0\nv 0 1 0\nvn 0 0 1\nf 1//1 2//1 3//1 \n";
	var obj2Ref = "v 0 0 1\nv 1 0 1\nv 0 1 1\nvn 0 0 1\nf 1//1 2//1 3//1 \n";
	var modelObjRef = "v 0 0 0\nv 1 0 0\nv 0 1 0\nvn 0 0 1\nf 1//1 2//1 3//1 \nv 0 0 1\nv 1 0 1\nv 0 1 1\nvn 0 0 1\nf 4//2 5//2 6//2 \n";

	var body1 = new JSM.Body ();
	body1.AddVertex (new JSM.BodyVertex (new JSM.Coord (0, 0, 0)));
	body1.AddVertex (new JSM.BodyVertex (new JSM.Coord (1, 0, 0)));
	body1.AddVertex (new JSM.BodyVertex (new JSM.Coord (0, 1, 0)));
	body1.AddPolygon (new JSM.BodyPolygon ([0, 1, 2]));

	var body2 = new JSM.Body ();
	body2.AddVertex (new JSM.BodyVertex (new JSM.Coord (0, 0, 1)));
	body2.AddVertex (new JSM.BodyVertex (new JSM.Coord (1, 0, 1)));
	body2.AddVertex (new JSM.BodyVertex (new JSM.Coord (0, 1, 1)));
	body2.AddPolygon (new JSM.BodyPolygon ([0, 1, 2]));
	body2.GetPolygon (0).SetMaterialIndex (0);
	
	var model = new JSM.Model ();
	model.AddBody (body1);
	model.AddBody (body2);
	
	var materials = new JSM.Materials ();
	materials.AddMaterial (new JSM.Material (0xcc0000, 0xcc0000));
	
	var gdl1 = JSM.ExportBodyToGDL (body1);
	test.Assert (gdl1 == gdl1Ref);
	var gdl2 = JSM.ExportBodyToGDL (body2);
	test.Assert (gdl2 == gdl2Ref);
	var modelGdl = JSM.ExportModelToGDL (model);
	test.Assert (modelGdl == gdl1 + gdl2);

	var gdl1 = JSM.ExportBodyToGDL (body1, materials);
	test.Assert (gdl1 == gdlMatHeader + gdlGeom1Ref);
	var gdl2 = JSM.ExportBodyToGDL (body2, materials);
	test.Assert (gdl2 == gdlMatHeader + gdlGeom2Ref);
	var modelGdl = JSM.ExportModelToGDL (model, materials);
	test.Assert (modelGdl == gdlMatHeader + gdlGeom1Ref + gdlGeom2Ref);

	var stl1 = JSM.ExportBodyToStl (body1, 'Body1');
	test.Assert (stl1 == stl1Ref);
	var stl2 = JSM.ExportBodyToStl (body2, 'Body2');
	test.Assert (stl2 == stl2Ref);
	var modelStl = JSM.ExportModelToStl (model, 'Model');
	test.Assert (modelStl == modelStlRef);

	var obj1 = JSM.ExportBodyToObj (body1);
	test.Assert (obj1 == obj1Ref);
	var obj2 = JSM.ExportBodyToObj (body2);
	test.Assert (obj2 == obj2Ref);
	var modelObj = JSM.ExportModelToObj (model);
	test.Assert (modelObj == modelObjRef);
});

AddTest ('TriangulateWithCentroidsTest', function (test)
{
	var AllPolygonIsTriangle = function (body)
	{
		var i;
		for (i = 0; i < body.PolygonCount (); i++) {
			if (body.GetPolygon (i).VertexIndexCount () != 3) {
				return false;
			}
		}
		return true;
	};

	var body = JSM.GenerateCuboid (1, 1, 1);
	test.Assert (body.VertexCount () == 8);
	test.Assert (body.PolygonCount () == 6);
	test.Assert (!AllPolygonIsTriangle (body));
	test.Assert (JSM.CheckSolidBody (body));
	
	body = JSM.TriangulateWithCentroids (body);
	test.Assert (body.VertexCount () == 8 + 6);
	test.Assert (body.PolygonCount () == 6 * 4);
	test.Assert (AllPolygonIsTriangle (body));
	test.Assert (JSM.CheckSolidBody (body));

	body = JSM.GenerateSolidWithRadius ('Dodecahedron', 1.0);
	test.Assert (body.VertexCount () == 20);
	test.Assert (body.PolygonCount () == 12);
	test.Assert (!AllPolygonIsTriangle (body));
	test.Assert (JSM.CheckSolidBody (body));
	
	body = JSM.TriangulateWithCentroids (body);
	test.Assert (body.VertexCount () == 20 + 12);
	test.Assert (body.PolygonCount () == 12 * 5);
	test.Assert (AllPolygonIsTriangle (body));
	test.Assert (JSM.CheckSolidBody (body));
});

AddTest ('CheckSolidBodyTest', function (test)
{
	var body = new JSM.Body ();

	var x = 1 / 2.0;
	var y = 1 / 2.0;
	var z = 1 / 2.0;
	
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (-x, -y, -z)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (x, -y, -z)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (x, -y, z)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (-x, -y, z)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (-x, y, -z)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (x, y, -z)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (x, y, z)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (-x, y, z)));

	body.AddPolygon (new JSM.BodyPolygon ([0, 1, 2, 3]));
	body.AddPolygon (new JSM.BodyPolygon ([1, 5, 6, 2]));
	body.AddPolygon (new JSM.BodyPolygon ([5, 4, 7, 6]));
	body.AddPolygon (new JSM.BodyPolygon ([4, 0, 3, 7]));
	body.AddPolygon (new JSM.BodyPolygon ([0, 4, 5, 1]));
	test.Assert (!JSM.IsSolidBody (body));
	test.Assert (!JSM.CheckSolidBody (body));
	
	body.AddPolygon (new JSM.BodyPolygon ([3, 7, 6, 2]));
	test.Assert (JSM.IsSolidBody (body));
	test.Assert (!JSM.CheckSolidBody (body));
	
	body.polygons[5] = new JSM.BodyPolygon ([3, 2, 6, 7]);
	test.Assert (JSM.IsSolidBody (body));
	test.Assert (JSM.CheckSolidBody (body));
});

AddTest ('PainterTest', function (test)
{
	var width = 300;
	var height = 200;
	
	var center =  new JSM.Coord (0, 0, 0);
	var up =  new JSM.Coord (0, 0, 1);
	var fieldOfView = 45.0;
	var aspectRatio = width / height;
	var nearPlane = 0.1;
	var farPlane = 1000.0;
	var viewPort = [0, 0, width, height];
	
	var ordered = [];
	
	var body = new JSM.Body ();
	
	var body = new JSM.Body ();

	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (0.0, 0.0, 0.0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (1.0, 0.0, 0.0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (1.0, 1.0, 1.0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (0.0, 1.0, 1.0)));
	body.AddPolygon (new JSM.BodyPolygon ([0, 1, 2, 3]));

	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (0.0, 0.5, 0.0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (1.0, 0.5, 0.0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (1.0, 1.5, 1.0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (0.0, 1.5, 1.0)));
	body.AddPolygon (new JSM.BodyPolygon ([4, 5, 6, 7]));

	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (0.0, 1.0, 0.0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (1.0, 1.0, 0.0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (1.0, 2.0, 1.0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (0.0, 2.0, 1.0)));
	body.AddPolygon (new JSM.BodyPolygon ([8, 9, 10, 11]));

	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (0.0, 1.5, 0.0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (1.0, 1.5, 0.0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (1.0, 2.5, 1.0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (0.0, 2.5, 1.0)));
	body.AddPolygon (new JSM.BodyPolygon ([12, 13, 14, 15]));

	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (0.0, 2.0, 0.0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (1.0, 2.0, 0.0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (1.0, 3.0, 1.0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (0.0, 3.0, 1.0)));
	body.AddPolygon (new JSM.BodyPolygon ([16, 17, 18, 19]));
	
	ordered = JSM.OrderPolygons (body, new JSM.Coord (0, 10, 0), center, up, fieldOfView, aspectRatio, nearPlane, farPlane, viewPort);
	test.Assert (ordered.length == body.PolygonCount ());
	test.Assert (ordered[0] == 0 && ordered[1] == 1 && ordered[2] == 2 && ordered[3] == 3 && ordered[4] == 4);

	ordered = JSM.OrderPolygons (body, new JSM.Coord (4, 8, 3), center, up, fieldOfView, aspectRatio, nearPlane, farPlane, viewPort);
	test.Assert (ordered.length == body.PolygonCount ());
	test.Assert (ordered[0] == 0 && ordered[1] == 1 && ordered[2] == 2 && ordered[3] == 3 && ordered[4] == 4);

	ordered = JSM.OrderPolygons (body, new JSM.Coord (0, -10, 0), center, up, fieldOfView, aspectRatio, nearPlane, farPlane, viewPort);
	test.Assert (ordered.length == body.PolygonCount ());
	test.Assert (ordered[0] == 4 && ordered[1] == 3 && ordered[2] == 2 && ordered[3] == 1 && ordered[4] == 0);

	ordered = JSM.OrderPolygons (body, new JSM.Coord (7, -5, 4), center, up, fieldOfView, aspectRatio, nearPlane, farPlane, viewPort);
	test.Assert (ordered.length == body.PolygonCount ());
	test.Assert (ordered[0] == 4 && ordered[1] == 3 && ordered[2] == 2 && ordered[3] == 1 && ordered[4] == 0);

	ordered = JSM.OrderPolygons (body, new JSM.Coord (-4, -7, 5), center, up, fieldOfView, aspectRatio, nearPlane, farPlane, viewPort);
	test.Assert (ordered.length == body.PolygonCount ());
	test.Assert (ordered[0] == 4 && ordered[1] == 3 && ordered[2] == 2 && ordered[3] == 1 && ordered[4] == 0);

	ordered = JSM.OrderPolygons (body, new JSM.Coord (-7, -7, 0.5), center, up, fieldOfView, aspectRatio, nearPlane, farPlane, viewPort);
	test.Assert (ordered.length == body.PolygonCount ());
	test.Assert (ordered[0] == 4 && ordered[1] == 3 && ordered[2] == 2 && ordered[3] == 1 && ordered[4] == 0);
});

AddTest ('ConvexHullTest', function (test)
{
	var result = [];
	var coord = [];
	
	coords = [];

	result = JSM.ConvexHull2D (coords);
	test.Assert (result.toString () == '');

	coords = [
		new JSM.Coord2D	(0, 0)
	];

	result = JSM.ConvexHull2D (coords);
	test.Assert (result.toString () == '');

	coords = [
		new JSM.Coord2D	(0, 0),
		new JSM.Coord2D	(1, 0)
	];

	result = JSM.ConvexHull2D (coords);
	test.Assert (result.toString () == '');

	coords = [
		new JSM.Coord2D	(0, 0),
		new JSM.Coord2D	(1, 0),
		new JSM.Coord2D	(1, 1)
	];

	result = JSM.ConvexHull2D (coords);
	test.Assert (result.toString () == '0,1,2');

	coords = [
		new JSM.Coord2D	(0, 0),
		new JSM.Coord2D	(1, 0),
		new JSM.Coord2D	(1, 1),
		new JSM.Coord2D	(0, 1)
	];

	result = JSM.ConvexHull2D (coords);
	test.Assert (result.toString () == '0,1,2,3');

	coords = [
		new JSM.Coord2D	(0, 0),
		new JSM.Coord2D	(1, 0),
		new JSM.Coord2D	(0.5, 0.5),
		new JSM.Coord2D	(1, 1),
		new JSM.Coord2D	(0, 1)
	];
	
	result = JSM.ConvexHull2D (coords);
	test.Assert (result.toString () == '0,1,3,4');

	coords = [
		new JSM.Coord2D	(0, 0),
		new JSM.Coord2D	(1, 0),
		new JSM.Coord2D	(0.5, 0.1),
		new JSM.Coord2D	(0.6, 0.2),
		new JSM.Coord2D	(0.7, 0.3),
		new JSM.Coord2D	(0.8, 0.4),
		new JSM.Coord2D	(1, 1),
		new JSM.Coord2D	(0, 1)
	];

	result = JSM.ConvexHull2D (coords);
	test.Assert (result.toString () == '0,1,6,7');

	coords = [
		new JSM.Coord2D	(0.5, 0.1),
		new JSM.Coord2D	(0.6, 0.2),
		new JSM.Coord2D	(0.7, 0.3),
		new JSM.Coord2D	(0.8, 0.4),
		new JSM.Coord2D	(0, 0),
		new JSM.Coord2D	(1, 0),
		new JSM.Coord2D	(1, 1),
		new JSM.Coord2D	(0, 1)
	];

	result = JSM.ConvexHull2D (coords);
	test.Assert (result.toString () == '4,5,6,7');

	coords = [
		new JSM.Coord2D	(2, 4),
		new JSM.Coord2D	(3, 2),
		new JSM.Coord2D	(4, 1),
		new JSM.Coord2D	(5, 6),
		new JSM.Coord2D	(1, 5),
		new JSM.Coord2D	(0, 4),
		new JSM.Coord2D	(2, 0)
	];

	result = JSM.ConvexHull2D (coords);
	test.Assert (result.toString () == '5,6,2,3,4');

	coords = [
		new JSM.Coord2D	(2, 5),
		new JSM.Coord2D	(3, 3),
		new JSM.Coord2D	(1, 3),
		new JSM.Coord2D	(5, 6),
		new JSM.Coord2D	(0, 1),
		new JSM.Coord2D	(4, 2),
		new JSM.Coord2D	(6, 1),
		new JSM.Coord2D	(4, 4),
		new JSM.Coord2D	(6, 6),
		new JSM.Coord2D	(0, 6)
	];

	result = JSM.ConvexHull2D (coords);
	test.Assert (result.toString () == '4,6,8,3,9');

	coords = [];
	result = JSM.ConvexHull3D (coords);
	test.Assert (result.toString () == '');

	coords.push (new JSM.Coord (0, 0, 0));
	result = JSM.ConvexHull3D (coords);
	test.Assert (result.toString () == '');

	coords.push (new JSM.Coord (1, 0, 0));
	result = JSM.ConvexHull3D (coords);
	test.Assert (result.toString () == '');

	coords.push (new JSM.Coord (1, 1, 0));
	result = JSM.ConvexHull3D (coords);
	test.Assert (result.toString () == '');

	coords.push (new JSM.Coord (0, 1, 0));
	result = JSM.ConvexHull3D (coords);
	test.Assert (result.toString () == '0,1,2,0,2,3,2,1,3,1,0,3');

	coords = [
		new JSM.Coord (0, 0, 0),
		new JSM.Coord (1, 0, 0),
		new JSM.Coord (1, 1, 0),
		new JSM.Coord (0, 1, 0),
		new JSM.Coord (0, 0, 1),
		new JSM.Coord (1, 0, 1),
		new JSM.Coord (1, 1, 1),
		new JSM.Coord (0, 1, 1)
	];

	result = JSM.ConvexHull3D (coords);
	test.Assert (result.toString () == '2,1,3,1,0,3,0,1,5,4,0,5,1,2,6,5,1,6,3,0,7,0,4,7,2,3,7,6,2,7,4,5,7,5,6,7');
	
	var a = 1.0;
	var b = 0.0;
	var c = (1.0 + Math.sqrt (5.0)) / 2.0;
	var d = 1.0 / c;
	
	coords = [
		new JSM.Coord (+a, +a, +a),
		new JSM.Coord (+a, +a, -a),
		new JSM.Coord (+a, -a, +a),
		new JSM.Coord (-a, +a, +a),
		
		new JSM.Coord (+a, -a, -a),
		new JSM.Coord (-a, +a, -a),
		new JSM.Coord (-a, -a, +a),
		new JSM.Coord (-a, -a, -a),

		new JSM.Coord (+b, +d, +c),
		new JSM.Coord (+b, +d, -c),
		new JSM.Coord (+b, -d, +c),
		new JSM.Coord (+b, -d, -c),

		new JSM.Coord (+d, +c, +b),
		new JSM.Coord (+d, -c, +b),
		new JSM.Coord (-d, +c, +b),
		new JSM.Coord (-d, -c, +b),

		new JSM.Coord (+c, +b, +d),
		new JSM.Coord (-c, +b, +d),
		new JSM.Coord (+c, +b, -d),
		new JSM.Coord (-c, +b, -d)
	];
	
	result = JSM.ConvexHull3D (coords);
	test.Assert (result.toString () == '3,8,14,8,0,14,0,12,14,1,9,14,12,1,14,9,5,14,2,10,15,13,2,15,10,6,15,7,11,15,11,4,15,4,13,15,10,2,16,0,8,16,8,10,16,6,10,17,8,3,17,10,8,17,4,11,18,9,1,18,11,9,18,1,12,18,12,0,18,0,16,18,2,13,18,16,2,18,13,4,18,11,7,19,5,9,19,9,11,19,3,14,19,17,3,19,14,5,19,7,15,19,15,6,19,6,17,19');

	coords.push (new JSM.Coord (0, 0, 0));
	coords.push (new JSM.Coord (0.1, 0, 0));
	coords.push (new JSM.Coord (0.1, 0.1, 0));
	coords.push (new JSM.Coord (0, 0.1, 0));
	coords.push (new JSM.Coord (0, 0, 0.1));
	coords.push (new JSM.Coord (0.1, 0, 0.1));
	coords.push (new JSM.Coord (0.1, 0.1, 0.1));
	coords.push (new JSM.Coord (0, 0.1, 0.1));

	result = JSM.ConvexHull3D (coords);
	test.Assert (result.toString () == '3,8,14,8,0,14,0,12,14,1,9,14,12,1,14,9,5,14,2,10,15,13,2,15,10,6,15,7,11,15,11,4,15,4,13,15,10,2,16,0,8,16,8,10,16,6,10,17,8,3,17,10,8,17,4,11,18,9,1,18,11,9,18,1,12,18,12,0,18,0,16,18,2,13,18,16,2,18,13,4,18,11,7,19,5,9,19,9,11,19,3,14,19,17,3,19,14,5,19,7,15,19,15,6,19,6,17,19');
});
