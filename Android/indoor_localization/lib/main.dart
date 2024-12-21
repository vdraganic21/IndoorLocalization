import 'package:flutter/material.dart';
import 'presentation/dashboard_page/dashboard_page.dart';
import 'config/app_colors.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key:key);
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Indoor Localization',
      theme: ThemeData(
        primaryColor: AppColors.primary500,
        scaffoldBackgroundColor: AppColors.neutral0,
        fontFamily: 'OpenSans',
      ),
      home: DashboardPage(),
    );
  }
}
